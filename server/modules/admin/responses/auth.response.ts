import { ApiProperty } from '@nestjs/swagger'
import { TokenOrigin } from 'server/core/auth/auth.enum'

export class TokenResponse {
  @ApiProperty({ description: '授权Token' })
  access_token: string

  @ApiProperty({ description: '刷新Token', required: false })
  refresh_token?: string

  @ApiProperty({ description: '授权Token过期时间' })
  expires_in: number

  @ApiProperty({ description: 'Token来源' })
  token_origin: TokenOrigin
}
