import { PRDBSupportedLanguage } from '../enums/supported-language.enum';

/**
 * Options for the `search` method
 */
export interface PRDBSearchOptions {
  /**
   * Optional language setting for product data. Defaults to main config, if not specified, defaults to `en`
   * @see {@link PRDBSupportedLanguage}
   */
  language?: PRDBSupportedLanguage;
}
