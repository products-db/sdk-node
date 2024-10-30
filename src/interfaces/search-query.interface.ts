export interface PRDBSearchQuery {
  /**
   * EAN code of the product. Must be provided as a string (this is mainly to ensure that the potentials leading zeros are not lost).
   * @type {string}
   */
  ean: string;
}
