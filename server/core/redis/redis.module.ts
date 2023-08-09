import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { RedisOptions } from './redis.options'

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: RedisOptions,
      isGlobal: true,
    }),
  ],
})
export class RedisModule {}
