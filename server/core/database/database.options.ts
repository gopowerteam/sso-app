import { Inject, Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { ConfigType } from '@nestjs/config'
import { DatabaseConfig } from '../../config/database.config'

@Injectable()
export class DatabaseOptions implements TypeOrmOptionsFactory {
  constructor(
    @Inject(DatabaseConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof DatabaseConfig>,
  ) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    // 获取数据库配置
    const config = this.databaseConfig

    return {
      ...config,
      // 自动加载实体
      autoLoadEntities: true,
      // 同步表结构
      synchronize: true,
      // 记录sql
      logging: process.env.NODE_ENV === 'production' ? ['error'] : 'all',
    }
  }
}
