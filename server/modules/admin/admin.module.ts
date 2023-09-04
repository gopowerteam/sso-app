import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Administrator } from 'server/entities/administrator.entity'
import { AuthModule } from 'server/core/auth/auth.module'
import { App } from 'server/entities/app.entity'
import { AuthPassword } from 'server/entities/auth-password.entity'
import { AuthWxmp } from 'server/entities/auth-wxmp.entity'
import { LaunchService } from './bootstrap/launch.service'
import { AdministratorService } from './services/administrator.service'
import { AuthController } from './controllers/auth.controller'
import { AppController } from './controllers/app.controller'
import { AppService } from './services/app.service'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Administrator,
      App,
      AuthPassword,
      AuthWxmp,
    ]),
  ],
  providers: [LaunchService, AdministratorService, AppService],
  controllers: [AuthController, AppController],
})
export class AdminModule {

}
