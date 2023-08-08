import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { Public } from 'server/core/auth/decorators/public.decorator'
import { AuthService } from 'server/core/auth/services/auth.service'
import { TokenResponse } from '../../responses/auth.response'
import { LoginInput } from '../../dtos/auth.dto'
import { AdministratorService } from '../../services/administrator.service'

@ApiTags('auth')
@ApiSecurity('access-token')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly administratorService: AdministratorService,
  ) {}

  @Public()
  @Post('login')
  @ApiOperation({ operationId: 'login', summary: '管理员登陆' })
  @ApiOkResponse({ type: TokenResponse })
  async login(@Body() { username, password }: LoginInput) {
    const administrator = await this.administratorService.findOne({
      username,
    })

    if (!administrator)
      throw new UnauthorizedException('用户不存在')

    if (!this.authService.comparePassword(password, administrator.password))
      throw new UnauthorizedException('用户名或密码错误')

    return this.authService.adminUserSign(administrator)
  }
}
