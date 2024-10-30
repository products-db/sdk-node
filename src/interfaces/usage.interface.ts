export interface PRDBUsageResponse {
  /**
   * The number of requests used in the current month.
   * @type {number}
   */
  used: number;
  /**
   * The total number of requests allowed in the current month.
   * @type {number}
   */
  limit: number;
  /**
   * The number of requests remaining in the current month.
   * @type {number}
   */
  remaining: number;
}
