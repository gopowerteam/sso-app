import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { AuthConfig } from 'server/config/auth.config'
import bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { Administrator } from 'server/entities/administrator.entity'
import { User } from 'server/entities/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { TokenOrigin } from '../auth.enum'

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthConfig.KEY)
    private readonly authConfig: ConfigType<typeof AuthConfig>,
    @InjectRepository(Administrator)
    private readonly administratorRepository: Repository<Administrator>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * 获取密码HASH
   * @param password
   * @returns
   */
  public async hashPassword(password: string) {
    const saltRounds = this.authConfig.saltRounds
    const hash = await bcrypt.hash(password, parseInt(saltRounds))
    return hash
  }

  /**
   * 比较密码
   * @param password
   * @param value
   */
  public comparePassword(password1, password2) {
    return bcrypt.compareSync(password1, password2)
  }

  /**
   * 管理端用户登录
   * @param admin
   * @returns
   */
  public getAdminUser(id: string) {
    return this.administratorRepository.findOneBy({
      id,
    })
  }

  public getAppUser(id: string) {
    return this.userRepository.findOneBy({
      id,
    })
  }

  /**
   * 管理员签名
   * @param admin
   * @returns
   */
  async adminUserSign(
    administrator: Administrator,
    refreshTokenSign = false,
  ) {
    const payload = {
      id: administrator.id,
      origin: TokenOrigin.Admin,
    }

    // 获取AccessToken
    const accessToken = this.jwtService.sign(payload, {
      secret: this.authConfig.accessTokenSecret,
      expiresIn: this.authConfig.accessTokenExpiresIn,
    })

    // 获取AccessToken
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.authConfig.refreshTokenSecret,
      expiresIn: this.authConfig.refreshTokenExpiresIn,
    })

    // 返回认证信息
    // const token: TokenResponse = {
    //   access_token: accessToken,
    //   refresh_token: accessToken,
    //   expires_in: this.authConfig.accessTokenExpiresIn,
    //   token_origin: TokenOrigin.Admin,
    // }

    // return token
  }
}
