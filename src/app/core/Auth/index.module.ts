import {Module} from "@nestjs/common";
import {AuthController} from "./index.controller";
import {AuthService} from "./index.service";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "src/common/strategies/jwt.strategy";
import {UserModule} from "../User/index.module";
import {PassportModule} from "@nestjs/passport";
import {JWT_CONFIG} from "src/env";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_CONFIG.SECRET,
      signOptions: {expiresIn: "1d"}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy]
})
export class AuthModule {}
