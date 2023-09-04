import { Body, Controller, Get, Headers, Post, UnauthorizedException, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { Public } from 'server/core/auth/decorators/public.decorator'
import { AuthService } from 'server/core/auth/auth.service'
import { Administrator } from 'server/entities/administrator.entity'
import { omit } from 'ramda'
import { RequestUser } from 'server/core/auth/decorators/request-user.decorator'
import { RefreshTokenGuard } from 'server/core/auth/guards/refresh-token.guard'
import { TokenResponse } from '../responses/auth.response'
import { ChangePasswordInput, LoginInput } from '../dtos/auth.dto'
import { AdministratorService } from '../services/administrator.service'

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
      throw new UnauthorizedException({ message: '用户不存在', toast: true })

    if (!this.authService.comparePassword(password, administrator.password))
      throw new UnauthorizedException({ message: '用户名或密码错误', toast: true })

    return this.authService.adminUserSign(administrator)
  }

  @Public()
  @Get('token')
  @ApiOperation({ operationId: 'token', summary: '刷新Token' })
  @ApiOkResponse({ type: TokenResponse })
  @UseGuards(RefreshTokenGuard)
  token(@Headers('Authorization') authorization, @RequestUser() administrator: Administrator) {
    const [token]: [string] = authorization.match(/(?<=\Bearer\s)(.*)/)
    return this.authService.adminUserSign(administrator, token)
  }

  @Get('current')
  @ApiOperation({ operationId: 'getCurrentUser', summary: '获取当前用户信息' })
  @ApiOkResponse({ type: Administrator })
  getCurrentUser(@RequestUser() administrator: Administrator) {
    return omit(['password'], administrator)
  }

  @Post('change-password')
  @ApiOperation({ operationId: 'changePassword', summary: '更新密码' })
  @ApiOkResponse()
  async changePassword(@RequestUser() administrator: Administrator, @Body() { oldPassword, newPassword }: ChangePasswordInput) {
    if (!this.authService.comparePassword(oldPassword, administrator.password))
      throw new UnauthorizedException({ message: '原密码错误', toast: true })

    administrator.password = await this.authService.hashPassword(newPassword)
    return administrator.save()
  }
}
