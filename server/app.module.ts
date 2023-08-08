import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { forConfigModule } from './config'
import { DatabaseModule } from './core/database/database.module'
import { SSRModule } from './core/ssr/ssr.module'

@Module({
  imports: [
    forConfigModule(),
    DatabaseModule,
    SSRModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
