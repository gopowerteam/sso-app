import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { pipe } from 'ramda'
import { ApiProperty } from '@nestjs/swagger'
import {
  EntityClass,
  EntityWithEnable,
  EntityWithTime,
  EntityWithUUID,
} from 'server/core/database/entity'
import { AuthUsername } from './auth-username.entity'
import { AuthEmail } from './auth-email.entity'
import { AuthPhone } from './auth-phone.entity'
import { AuthWxmp } from './auth-wxmp.entity'

@Entity('app')
export class App extends pipe(
  EntityWithUUID,
  EntityWithEnable,
  EntityWithTime,
)(EntityClass) {
  @ApiProperty({ description: '应用名称' })
  @Column()
  name: string

  @ApiProperty({ description: '应用描述' })
  @Column({ nullable: true })
  description?: string

  @ApiProperty({ description: '应用域名' })
  @Column()
  domain: string

  @ApiProperty({ description: '用户名授权支持' })
  @OneToOne(() => AuthUsername, { nullable: true })
  @JoinColumn()
  authUsername: AuthUsername

  @ApiProperty({ description: '邮箱授权支持' })
  @OneToOne(() => AuthEmail, { nullable: true })
  @JoinColumn()
  authEmail: AuthEmail

  @ApiProperty({ description: '手机授权支持' })
  @OneToOne(() => AuthPhone, { nullable: true })
  @JoinColumn()
  authPhone: AuthPhone

  @ApiProperty({ description: '微信公众号授权支持' })
  @OneToOne(() => AuthWxmp, { nullable: true })
  @JoinColumn()
  authWxmp: AuthWxmp
}
