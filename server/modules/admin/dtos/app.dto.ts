import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsUrl, Length } from 'class-validator'
import { AuthWxmp } from 'server/entities/auth-wxmp.entity'
import { AccountType, AuthType } from 'server/global/enums'

export class AuthPasswordInput {
  @ApiProperty({ description: '登录类型', isArray: true })
  loginType: AccountType[]

  @ApiProperty({ description: '注册类型' })
  registerType?: AccountType
}

export class AppCreateInput {
  @ApiProperty({ description: '应用名称' })
  @Length(3, 20)
  name: string

  @ApiProperty({ description: '应用描述' })
  @IsOptional()
  description: string

  @ApiProperty({ description: '应用域名' })
  @IsUrl()
  domain: string

  @ApiProperty({ description: '授权类型', enum: AuthType })
  @IsEnum(AuthType)
  authType: AuthType

  @ApiProperty({ description: '密码授权配置', type: AuthPasswordInput })
  @IsOptional()
  authPassword?: AuthPasswordInput

  @ApiProperty({ description: '微信公众号授权配置', type: AuthWxmp })
  @IsOptional()
  authWxmp?: AuthWxmp
}

export class AppUpdateInput extends PartialType(AppCreateInput) {}
