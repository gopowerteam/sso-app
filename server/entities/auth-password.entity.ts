import { Column, Entity } from 'typeorm'
import { pipe } from 'ramda'
import { AccountType } from 'server/global/enums'
import {
  EntityClass,
  EntityWithEnable,
  EntityWithTime,
  EntityWithUUID,
} from 'server/core/database/entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('auth-password')
export class AuthPassword extends pipe(
  EntityWithUUID,
  EntityWithEnable,
  EntityWithTime,
)(EntityClass) {
  @ApiProperty({ description: '登录类型', isArray: true, enum: AccountType })
  @Column('text', { array: true })
  loginType?: AccountType[]

  @ApiProperty({ description: '注册类型', enum: AccountType })
  @Column({ nullable: true })
  registerType?: AccountType
}
