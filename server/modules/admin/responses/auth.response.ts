import { ApiProperty } from '@nestjs/swagger'
import { TokenOrigin } from 'server/core/auth/auth.enum'

export class TokenResponse {
  @ApiProperty({ description: 'AccessToken' })
  access_token: string

  @ApiProperty({ description: 'RefreshToken' })
  refresh_token: string

  @ApiProperty({ description: 'AccessToken过期时间' })
  expires_in: number

  @ApiProperty({ description: 'Token来源' })
  token_origin: TokenOrigin
}
