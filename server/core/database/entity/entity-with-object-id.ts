import { ObjectId, ObjectIdColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Constructor } from '.'
/**
 * 基础实体类型
 * 默认添加id字段
 * @param Base
 * @returns
 */
export function EntityWithObjectID<TBase extends Constructor>(Base: TBase) {
  abstract class AbstractBase extends Base {
    @ApiProperty({ description: 'ID' })
    @ObjectIdColumn()
    id: ObjectId
  }
  return AbstractBase
}
