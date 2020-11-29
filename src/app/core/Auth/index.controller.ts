import {Body, Controller, Post} from "@nestjs/common";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {LoginDto} from "src/common/dto/User/login.dto";
import {RegisterDto} from "src/common/dto/User/register.dto";
import {IUserLoginResponse} from "src/common/interface/i.user";
import {AuthService} from "./index.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post("/login")
  @ApiBody({type: () => LoginDto})
  login(@Body() dto: LoginDto): Promise<IUserLoginResponse> {
    return this.service.login(dto);
  }

  @Post("/register")
  @ApiBody({type: () => RegisterDto})
  register(@Body() dto: RegisterDto): Promise<IUserLoginResponse> {
    return this.service.register(dto);
  }
}
