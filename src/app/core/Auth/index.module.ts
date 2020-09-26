import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './index.controller';
import { AuthService } from './index.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/common/constants';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { UserModule } from '../User/index.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/common/strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_CONFIG.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtStrategy]
})
export class AuthModule {}