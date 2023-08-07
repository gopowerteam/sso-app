import { applyDecorators } from '@nestjs/common'
import { WhereOperator } from './database.enums'
import {
  WHERE_OPTION_ENTITY_METADATA,
  WHERE_OPTION_METADATA,
  WHERE_OPTION_NAME_METADATA,
  WHERE_OPTION_TYPE_METADATA,
} from './constants'

export function WhereOption(options: {
  type?: WhereOperator
  name?: string
  entity?: string
}) {
  return applyDecorators(
    Reflect.metadata(WHERE_OPTION_METADATA, true),
    Reflect.metadata(
      WHERE_OPTION_TYPE_METADATA,
      options.type || WhereOperator.Equal,
    ),
    Reflect.metadata(WHERE_OPTION_NAME_METADATA, options.name),
    Reflect.metadata(WHERE_OPTION_ENTITY_METADATA, options.entity),
  )
}
