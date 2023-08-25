import { Column, Entity } from 'typeorm'
import { pipe } from 'ramda'
import { ApiProperty } from '@nestjs/swagger'
import {
  EntityClass,
  EntityWithEnable,
  EntityWithTime,
  EntityWithUUID,
} from 'server/core/database/entity'

@Entity('user')
export class User extends pipe(
  EntityWithUUID,
  EntityWithEnable,
  EntityWithTime,
)(EntityClass) {
  @ApiProperty({ description: '用户昵称' })
  @Column({ nullable: true })
  nickname?: string

  @ApiProperty({ description: '用户名' })
  @Column({ nullable: true })
  username?: string

  @ApiProperty({ description: '用户邮箱' })
  @Column({ nullable: true })
  email?: string

  @Column({ nullable: true })
  password?: string

  @ApiProperty({ description: 'OPENID' })
  @Column({ nullable: true })
  openid: string

  @ApiProperty({ description: 'UNIONID' })
  @Column({ nullable: true })
  unionid: string

  @ApiProperty({ description: '手机号码' })
  @Column({ nullable: true })
  mobile: string
}
