import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { DatabaseOptions } from './database.options'
import { DatabaseConfig } from './database.config'

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(DatabaseConfig),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseOptions,
    }),
  ],
  providers: [DatabaseOptions],
})
export class DatabaseModule {}
