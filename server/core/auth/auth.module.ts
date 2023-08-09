import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Administrator } from 'server/entities/administrator.entity'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { APP_GUARD } from '@nestjs/core'
import { User } from 'server/entities/user.entity'
import { AuthService } from './auth.service'
import { AccessTokenStrategy } from './strategies/access-token.strategy'
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy'
import { AccessTokenAuthGuard } from './guards/access-token.guard'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ global: true }),
    TypeOrmModule.forFeature([Administrator, User]),
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
