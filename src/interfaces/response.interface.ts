import { PRDBProductResponse } from './product-response.interface';
import { PRDBUsageResponse } from './usage.interface';

export interface PRDBResponse {
  /**
   * The product that matched the search query.
   * @type {PRDBProductResponse}
   */
  product: PRDBProductResponse;
  /**
   * The current month's usage.
   * @type {PRDBUsageResponse}
   */
  usage: PRDBUsageResponse;
}
