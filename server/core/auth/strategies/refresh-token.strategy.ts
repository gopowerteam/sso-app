import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import {
  Inject,
  Injectable,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { AuthConfig } from 'server/config/auth.config'
import { Administrator } from 'server/entities/administrator.entity'
import { User } from 'server/entities/user.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import type { Cache } from 'cache-manager'
import { AuthService } from '../services/auth.service'
import { TokenOrigin } from '../auth.enum'

interface JwtPayload {
  id: string
  origin: TokenOrigin
  appId?: string
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @Inject(AuthConfig.KEY)
    private readonly authConfig: ConfigType<typeof AuthConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: authConfig.refreshTokenSecret,
    })
  }

  async validate(payload: JwtPayload) {
    const getTargetUser = (): Promise<User | Administrator | undefined> => {
      switch (payload.origin) {
        case TokenOrigin.Admin:
          return this.authService.getAdminUser(payload.id)
        default:
          return this.authService.getAppUser(payload.id)
      }
    }

    // 获取登录用户
    const user = await getTargetUser()
    if (user) return user
  }
}
