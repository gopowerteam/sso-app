import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Administrator } from 'server/entities/administrator.entity'
import { AuthModule } from 'server/core/auth/auth.module'
import { LaunchService } from './bootstrap/launch.service'
import { AdministratorService } from './services/administrator.service'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Administrator,
    ]),
  ],
  providers: [LaunchService, AdministratorService],
})
export class AdminModule {

}
