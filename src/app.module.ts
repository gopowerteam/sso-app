import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { forConfigModule } from './config'
import { DatabaseModule } from './core/database/database.module'

@Module({
  imports: [
    forConfigModule(),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
