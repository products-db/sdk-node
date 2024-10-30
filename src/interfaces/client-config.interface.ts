import { PRDBSupportedLanguage } from '../enums/supported-language.enum';

/**
 * Configuration interface for the Products Database client
 */
export interface PRDBClientConfig {
  /**
   * API key required for authentication with the Products Database. If you do not have one, register at https://products-db.com.
   * @see {@link https://docs.products-db.com/authentication}
   * @type {string}
   */
  apiKey: string;
  /**
   * Optional language setting for product data. Defaults to `en`
   * @see {@link PRDBSupportedLanguage}
   * @see {@link https://docs.products-db.com/supported-languages}
   */
  language?: PRDBSupportedLanguage;
}
