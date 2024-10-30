import { PRDBClientConfig } from './interfaces/client-config.interface';
import { PRDBResponse } from './interfaces/response.interface';
import { PRDBSearchOptions } from './interfaces/search-options.interface';
import { PRDBSearchQuery } from './interfaces/search-query.interface';
import https from 'https';

class PRDBError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: string
  ) {
    super(message);
    this.name = 'PRDBError';
  }
}

export class ProductsDBClient {
  private readonly config: PRDBClientConfig;
  private readonly baseUrl = 'api.products-db.com';
  private readonly version = 'v1';
  private readonly limitHeaderName = 'X-Credits-Limit';
  private readonly usedHeaderName = 'X-Credits-Used';
  private readonly remainingHeaderName = 'X-Credits-Remaining';
  private readonly defaultTimeout = 10000;

  constructor(config: PRDBClientConfig) {
    this.config = config;
    this.validateConfig();
  }

  /**
   * Search for a product by EAN code
   * @param {PRDBSearchQuery} query - The search query
   * @param {PRDBSearchOptions} options - Optional search options
   * @returns {Promise<PRDBProductResponse>} A promise that resolves to the product response
   * @throws {NotFoundError} If the product is not found. If you encounter this error, it is likely that the product does not exist (yet) in the ProductsDB database. We would appreciate if you could report it to us using the "Report a missing product" form on our website.
   */
  search({ ean }: PRDBSearchQuery, options?: PRDBSearchOptions): Promise<PRDBResponse> {
    if (!ean || typeof ean !== 'string') {
      throw new Error('EAN code must be a non-empty string. At this time, only searches by EAN codes are supported.');
    }
    return this.request({ ean }, options);
  }

  /**
   * Sends a request to the ProductsDB API
   * @param {PRDBSearchQuery} query - The search query
   * @param {PRDBSearchOptions} options - Optional search options
   * @returns {Promise<PRDBProductResponse>} A promise that resolves to the product response
   */
  private request(query: PRDBSearchQuery, options?: PRDBSearchOptions): Promise<PRDBResponse> {
    const queryParams = new URLSearchParams({
      ean: query.ean,
      ...(options?.language ? { language: options.language } : this.config.language ? { language: this.config.language } : {}),
    });

    const requestOptions = {
      hostname: this.baseUrl,
      path: `/${this.version}/products/search?${queryParams}`,
      method: 'GET',
      headers: {
        'X-Api-Key': this.config.apiKey,
        Accept: 'application/json',
      },
    };

    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
        reject(new PRDBError(`Request timed out after ${this.defaultTimeout}ms`));
      }, this.defaultTimeout);

      const req = https.request(
        {
          ...requestOptions,
          signal: controller.signal as any, // Type assertion needed for Node.js < 18
        },
        (res) => {
          const chunks: Buffer[] = [];
          const headers = res.headers as Record<string, string>;

          res.on('data', (chunk) => chunks.push(Buffer.from(chunk)));

          res.on('end', () => {
            clearTimeout(timeout);
            const data = Buffer.concat(chunks).toString();

            try {
              if (res.statusCode === 200) {
                const usage = {
                  used: Number(headers[this.usedHeaderName.toLowerCase()]),
                  limit: Number(headers[this.limitHeaderName.toLowerCase()]),
                  remaining: Number(headers[this.remainingHeaderName.toLowerCase()]),
                };

                resolve({
                  product: JSON.parse(data).product,
                  usage,
                });
              } else {
                reject(new PRDBError('Request failed', res.statusCode, data));
              }
            } catch (error) {
              reject(new PRDBError('Failed to parse response'));
            }
          });
        }
      );

      req.on('error', (error) => {
        clearTimeout(timeout);
        reject(new PRDBError(`Network error: ${error.message}`));
      });

      req.end();
    });
  }

  /**
   * Validates the configuration object
   * @throws {Error} If the API key is not provided
   */
  private validateConfig() {
    if (!this.config.apiKey) {
      throw new Error('You must provide an API key. If you do not have one, register at https://products-db.com.');
    }
  }
}
