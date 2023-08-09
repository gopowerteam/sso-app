import { Column, Entity } from 'typeorm'
import { pipe } from 'ramda'
import { ApiProperty } from '@nestjs/swagger'
import {
  EntityClass,
  EntityWithEnable,
  EntityWithTime,
  EntityWithUUID,
} from 'server/core/database/entity'

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

  @Column()
  wechatLogin: boolean

  @Column()
  password: boolean
}
