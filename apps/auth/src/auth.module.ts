import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoggerModule } from '@app/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, LoggerModule, JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: `${configService.get('JWT_EXPIRATION')}s`
      }
    })
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
