import { ApiProperty } from '@nestjs/swagger'
import { Length } from 'class-validator'

export class LoginInput {
  @ApiProperty({ description: '用户名' })
  @Length(4, 20)
  username: string

  @ApiProperty({ description: '密码' })
  @Length(6, 20)
  password: string
}

export class ChangePasswordInput {
  @ApiProperty({ description: '旧密码' })
  @Length(6, 20)
  oldPassword: string

  @ApiProperty({ description: '新密码' })
  @Length(4, 20)
  newPassword: string
}
