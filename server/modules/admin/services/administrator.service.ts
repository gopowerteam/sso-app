import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthService } from 'server/core/auth/auth.service'
import { PaginatorMode } from 'server/core/database/database.enums'
import { QueryInputParam } from 'server/core/database/database.interfaces'
import { buildPaginator } from 'server/core/database/query/paginator'
import { Administrator } from 'server/entities/administrator.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(Administrator)
    private readonly administratorRepository: Repository<Administrator>,
    private readonly authService: AuthService,
  ) {}

  /**
   * 添加管理员
   * @param username
   * @param password
   * @returns
   */
  public async create(username: string, password: string) {
    const hash = await this.authService.hashPassword(password)

    const administrator = this.administratorRepository.create({
      username,
      password: hash,
    })

    return administrator.save({ reload: true })
  }

  /**
   * 删除管理员
   * @returns
   */
  public async delete(id: string) {
    await this.administratorRepository.delete(id)
  }

  /**
   * 查找管理员
   * @returns
   */
  findAll({ buildWhereQuery, page, order }: QueryInputParam<Administrator>) {
    const builder
      = this.administratorRepository.createQueryBuilder('administrator')

    builder.andWhere(buildWhereQuery())

    const paginator = buildPaginator({
      mode: PaginatorMode.Index,
      entity: Administrator,
      query: {
        order,
        skip: page.skip,
        limit: page.limit,
      },
    })

    return paginator.paginate(builder)
  }

  /**
   * 获取管理员
   * @param id
   * @returns
   */
  findOne(where: FindOptionsWhere<Administrator>) {
    return this.administratorRepository.findOneBy(where)
  }

  /**
   * 更新管理员
   * @param id
   * @param updateTestDto
   * @returns
   */
  update(id: string, input: Partial<Administrator>) {
    return this.administratorRepository.update(id, input)
  }

  /**
   * 添加管理员
   * @param username
   * @param password
   * @returns
   */
  public async resetAdministratorPassword(id: string) {
    // 生成随机密码
    const password = Math.random().toString(36).slice(-6)

    const hash = await this.authService.hashPassword(password)

    await this.administratorRepository.update(id, {
      password: hash,
    })

    return password
  }

  /**
   * 添加管理员
   * @param username
   * @param password
   * @returns
   */
  public async updateAdministratorPassword(id: string, password: string) {
    // 生成随机密码
    const hash = await this.authService.hashPassword(password)

    await this.administratorRepository.update(id, {
      password: hash,
    })
  }

  /**
   * 检查是否存在管理员
   * @returns
   */
  public async isExist() {
    return this.administratorRepository.exist()
  }
}
