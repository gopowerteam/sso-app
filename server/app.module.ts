import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { forConfigModule } from './config'
import { DatabaseModule } from './core/database/database.module'
import { SSRModule } from './core/ssr/ssr.module'
import { AdminModule } from './modules/admin/admin.module'
import { ClientModule } from './modules/client/client.module'
import { AuthModule } from './core/auth/auth.module'
import { LoggerModule } from './core/logger/logger.module'

@Module({
  imports: [
    forConfigModule(),
    LoggerModule,
    DatabaseModule,
    SSRModule,
    AuthModule,
    AdminModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
