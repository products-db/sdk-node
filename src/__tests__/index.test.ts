import { ProductsDBClient } from '../index';
import { PRDBSupportedLanguage } from '../enums/supported-language.enum';
import https from 'https';
import { EventEmitter } from 'events';

// Mock https module
jest.mock('https');

describe('ProductsDBClient', () => {
  let client: ProductsDBClient;
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    client = new ProductsDBClient({ apiKey: mockApiKey });
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create instance with required config', () => {
      expect(client).toBeInstanceOf(ProductsDBClient);
    });

    it('should throw error if apiKey is missing', () => {
      expect(() => new ProductsDBClient({} as any)).toThrow('You must provide an API key. If you do not have one, register at https://products-db.com.');
    });
  });

  describe('search', () => {
    it('should throw error if EAN is missing', async () => {
      await expect(async () => {
        await client.search({ ean: '' });
      }).rejects.toThrow('EAN code must be a non-empty string. At this time, only searches by EAN codes are supported.');
    });

    it('should throw error if EAN is not a string', async () => {
      await expect(async () => {
        await client.search({ ean: 123 as any });
      }).rejects.toThrow('EAN code must be a non-empty string. At this time, only searches by EAN codes are supported.');
    });

    it('should make successful API call with correct parameters', async () => {
      const mockResponse = {
        brand: 'Test Brand',
        category: 'Test Category',
        description: 'Test Description',
        image: 'https://example.com/image.jpg',
        name: 'Test Product',
      };

      const mockHttpResponse = new EventEmitter() as EventEmitter & {
        headers: Record<string, string>;
        statusCode?: number;
      };
      mockHttpResponse.headers = {
        'x-credits-used': '1',
        'x-credits-limit': '1000',
        'x-credits-remaining': '999',
      };
      mockHttpResponse.statusCode = 200;

      (https.request as jest.Mock).mockImplementation((options, callback) => {
        callback(mockHttpResponse);
        return {
          end: jest.fn(),
          on: jest.fn(),
          write: jest.fn(),
        };
      });

      const responsePromise = client.search({ ean: '1234567890123' }, { language: PRDBSupportedLanguage.EN });

      // Emit the response data with the correct structure
      mockHttpResponse.emit('data', Buffer.from(JSON.stringify({ product: mockResponse })));
      mockHttpResponse.emit('end');

      const response = await responsePromise;
      expect(response).toEqual({
        product: mockResponse,
        usage: {
          used: 1,
          limit: 1000,
          remaining: 999,
        },
      });
    });

    it('should handle API errors correctly', async () => {
      const mockHttpResponse = new EventEmitter() as EventEmitter & {
        headers: Record<string, string>;
        statusCode?: number;
      };
      mockHttpResponse.headers = {};
      mockHttpResponse.statusCode = 404;

      (https.request as jest.Mock).mockImplementation((options, callback) => {
        callback(mockHttpResponse);
        return {
          end: jest.fn(),
          on: jest.fn(),
        };
      });

      const responsePromise = client.search({ ean: '1234567890123' });

      mockHttpResponse.emit('data', Buffer.from(JSON.stringify({ error: 'Product not found' })));
      mockHttpResponse.emit('end');

      await expect(responsePromise).rejects.toThrow('Request failed');
    });

    it('should handle timeout correctly', async () => {
      jest.useFakeTimers();

      (https.request as jest.Mock).mockImplementation(() => ({
        end: jest.fn(),
        on: jest.fn(),
      }));

      const searchPromise = client.search({ ean: '1234567890123' });

      jest.advanceTimersByTime(10000);

      await expect(searchPromise).rejects.toThrow('Request timed out after 10000ms');

      jest.useRealTimers();
    });
  });
});
