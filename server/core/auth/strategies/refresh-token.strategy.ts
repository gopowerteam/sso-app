import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { AuthConfig } from 'server/config/auth.config'
import { Administrator } from 'server/entities/administrator.entity'
import { User } from 'server/entities/user.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import type { Cache } from 'cache-manager'
import { Request } from 'express'
import { CACHE_ADMIN_USER_TOKEN, CACHE_APP_USER_TOKEN } from 'server/global/consants'
import { AuthService } from '../auth.service'
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
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @Inject(AuthConfig.KEY)
    private readonly authConfig: ConfigType<typeof AuthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: authConfig.refreshTokenSecret,
    })
  }

  async validate(req: Request, payload: JwtPayload) {
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

    // 获取Token来源
    const origin = {
      [TokenOrigin.Admin]: CACHE_ADMIN_USER_TOKEN,
      [TokenOrigin.App]: CACHE_APP_USER_TOKEN,
    }[payload.origin]

    const [token] = (req.headers?.authorization || '').match(/(?<=\Bearer\s)(.*)/)

    // 验证Token
    if ((await this.cacheManager.get(`${origin}:${token}`)) === user.id) {
      // 更新缓存过期时间
      await this.cacheManager.del(`${origin}:${token}`)
    }
    else {
      // LOG:查看过期原因
      Logger.error('登录过期:', {
        ...payload,
        token,
      })

      throw new UnauthorizedException('不存在的RefreshToken')
    }

    if (user) return user
  }
}
