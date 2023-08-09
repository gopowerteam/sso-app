/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TokenResponse = {
  /**
   * AccessToken
   */
  access_token: string;
  /**
   * RefreshToken
   */
  refresh_token: string;
  /**
   * AccessToken过期时间
   */
  expires_in: number;
  /**
   * Token来源
   */
  token_origin: string;
}
