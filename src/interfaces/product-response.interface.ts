/**
 * Represents the response for a product.
 * @see https://docs.products-db.com/api-reference
 */
export interface PRDBProductResponse {
  /**
   * The European Article Number for the product.
   * @see https://en.wikipedia.org/wiki/European_Article_Number
   * @type {string}
   */
  ean: string;

  /**
   * The localized model name or number of the product.
   * @type {string}
   */
  model: string;

  /**
   * A localized detailed description of the product.
   * @type {string}
   */
  description: string;

  /**
   * The unique identifier for the product. This identifier is unique across all products and brands stored in the ProductsDB. You can use this identifier to report issues with the product to our support team.
   * @type {string}
   */
  id: string;

  /**
   * The categories to which the product belongs.
   * @type {PRDBCategoryResponse[]}
   */
  categories: PRDBCategoryResponse[];

  /**
   * The brand information associated with the product.
   * @type {PRDBBrandResponse}
   */
  brand: PRDBBrandResponse;

  /**
   * Optional packshots (product images) associated with the product.
   * @type {PRDBPackshotResponse[]}
   */
  packshots?: PRDBPackshotResponse[];
}

/**
 * Represents the response for a brand.
 */
export interface PRDBBrandResponse {
  /**
   * The unique identifier for the brand.
   * @type {string}
   */
  id: string;

  /**
   * The name of the brand.
   * @type {string}
   */
  name: string;

  /**
   * The URL-friendly slug for the brand.
   * @type {string}
   */
  slug: string;

  /**
   * Optional logos associated with the brand.
   * @type {PRDBBrandLogoResponse[]}
   */
  logos?: PRDBBrandLogoResponse[];
}

/**
 * Represents the response for a product category.
 */
export interface PRDBCategoryResponse {
  /**
   * The label or name of the category.
   * @type {string}
   */
  label: string;

  /**
   * The parent category identifier.
   * @type {string}
   */
  parent: string;
}

/**
 * Represents the response for a packshot image.
 */
export interface PRDBPackshotResponse {
  /**
   * The URL of the packshot image.
   * @type {string}
   */
  url: string;

  /**
   * The width of the packshot image in pixels.
   * @type {number}
   */
  width: number;

  /**
   * The height of the packshot image in pixels.
   * @type {number}
   */
  height: number;

  /**
   * The size of the packshot image in bytes.
   * @type {number}
   */
  size: number;

  /**
   * The format of the packshot image.
   * @type {'webp' | 'png' | 'jpg'}
   */
  format: 'webp' | 'png' | 'jpg';

  /**
   * The type of the packshot image.
   * @type {'packshot'}
   */
  type: 'packshot';
}

/**
 * Represents the response for a brand logo.
 */
export interface PRDBBrandLogoResponse {
  /**
   * The URL of the brand logo.
   * @type {string}
   */
  url: string;

  /**
   * The width of the brand logo in pixels.
   * @type {number}
   */
  width: number;

  /**
   * The height of the brand logo in pixels.
   * @type {number}
   */
  height: number;

  /**
   * The size of the brand logo in bytes.
   * @type {number}
   */
  size: number;

  /**
   * The format of the brand logo.
   * @type {'webp' | 'png' | 'jpg'}
   */
  format: 'webp' | 'png' | 'jpg';

  /**
   * The type of the brand logo.
   * @type {'logo'}
   */
  type: 'logo';

  /**
   * The theme of the brand logo.
   * @type {'light' | 'dark'}
   */
  theme: 'light' | 'dark';
}
