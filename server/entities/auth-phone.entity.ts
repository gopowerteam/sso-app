import { Column, Entity } from 'typeorm'
import { pipe } from 'ramda'
import { ApiProperty } from '@nestjs/swagger'
import {
  EntityClass,
  EntityWithEnable,
  EntityWithTime,
  EntityWithUUID,
} from 'server/core/database/entity'

@Entity('auth-phone')
export class AuthPhone extends pipe(
  EntityWithUUID,
  EntityWithEnable,
  EntityWithTime,
)(EntityClass) {

}
