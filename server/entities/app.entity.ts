import { Column, Entity } from 'typeorm'
import { pipe } from 'ramda'
import { ApiProperty } from '@nestjs/swagger'
import {
  EntityClass,
  EntityWithEnable,
  EntityWithObjectID,
  EntityWithTime,
} from 'server/core/database/entity'

@Entity('app')
export class App extends pipe(
  EntityWithObjectID,
  EntityWithEnable,
  EntityWithTime,
)(EntityClass) {
  @ApiProperty({ description: '应用名称' })
  @Column()
  name: string

  @Column()
  domain?: string
}
