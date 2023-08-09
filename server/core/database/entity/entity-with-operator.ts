import { ApiProperty } from '@nestjs/swagger'
import { RequestContext } from 'server/middlewaves/request-context.middlewave'
import { BeforeInsert, BeforeSoftRemove, BeforeUpdate, Column } from 'typeorm'
import { Constructor } from '.'

/**
 * 基础实体类型
 * 默认添加operator字段 *
 * @param Base
 * @returns
 */
export function EntityWithOperator<TBase extends Constructor>(Base: TBase) {
  abstract class AbstractBase extends Base {
    @ApiProperty({ description: '操作人', type: 'string' })
    @Column({ nullable: true })
    public operator?: string

    @BeforeInsert()
    @BeforeUpdate()
    @BeforeSoftRemove()
    setOperator() {
      this.operator = RequestContext.currentContext?.user
    }
  }
  return AbstractBase
}
