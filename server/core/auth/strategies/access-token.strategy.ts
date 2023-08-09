import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { AuthConfig } from 'server/config/auth.config'
import { AuthService } from '../auth.service'
import { TokenOrigin } from '../auth.enum'

interface JwtPayload {
  id: string
  origin: TokenOrigin
  appId?: string
  mode?: string
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(
    private readonly authService: AuthService,
    @Inject(AuthConfig.KEY)
    public readonly authConfig: ConfigType<typeof AuthConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.accessTokenSecret,
    })
  }

  /**
   * 验证用户
   * @param payload
   * @returns
   */
  async validate(payload: JwtPayload) {
    const getTargetUser = () => {
      switch (payload.origin) {
        case TokenOrigin.Admin:
          return this.authService.getAdminUser(payload.id)
        case TokenOrigin.App:
          return this.authService.getAppUser(payload.id)
      }
    }

    // 获取登录用户
    const user = await getTargetUser()

    if (user) return user
  }
}
