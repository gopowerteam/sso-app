import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseOptions } from './database.options'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseOptions,
    }),
  ],
  providers: [DatabaseOptions],
})
export class DatabaseModule {}
