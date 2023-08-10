import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager'
import {
  Inject,
  Injectable,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import * as store from 'cache-manager-redis-store'
import { RedisConfig } from 'server/config/redis.config'

@Injectable()
export class RedisOptions implements CacheOptionsFactory {
  constructor(
    @Inject(RedisConfig.KEY)
    private readonly redisConfig: ConfigType<typeof RedisConfig>,
  ) {}

  createCacheOptions(): CacheModuleOptions {
    const config = this.redisConfig

    return {
      store,
      ...config,
    }
  }
}
