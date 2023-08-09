import { Column, Entity } from 'typeorm'
import { pipe } from 'ramda'
import { ApiProperty } from '@nestjs/swagger'
import {
  EntityClass,
  EntityWithEnable,
  EntityWithTime,
  EntityWithUUID,
} from 'server/core/database/entity'
import { EntityWithOperator } from 'server/core/database/entity/entity-with-operator'

@Entity('administrator')
export class Administrator extends pipe(
  EntityWithUUID,
  EntityWithEnable,
  EntityWithTime,
  EntityWithOperator,
)(EntityClass) {
  @ApiProperty({ description: '用户名' })
  @Column()
  username: string

  @ApiProperty({ description: '密码' })
  @Column()
  password: string
}
