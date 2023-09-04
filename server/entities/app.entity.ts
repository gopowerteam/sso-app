import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { pipe } from 'ramda'
import { ApiProperty } from '@nestjs/swagger'
import {
  EntityClass,
  EntityWithEnable,
  EntityWithTime,
  EntityWithUUID,
} from 'server/core/database/entity'
import { AuthType } from 'server/global/enums'
import { AuthPassword } from './auth-password.entity'
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

  @ApiProperty({ description: '授权类型', enum: AuthType })
  @Column({ enum: AuthType })
  authType: AuthType

  @ApiProperty({ description: '密码授权支持', type: () => AuthPassword })
  @OneToOne(() => AuthPassword, { nullable: true, cascade: true })
  @JoinColumn()
  authPassword?: AuthPassword

  @ApiProperty({ description: '微信公众号授权支持', type: () => AuthWxmp })
  @OneToOne(() => AuthWxmp, { nullable: true, cascade: true })
  @JoinColumn()
  authWxmp?: AuthWxmp
}
