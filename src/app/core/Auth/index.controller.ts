import {Body, Controller, Post} from "@nestjs/common";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {RegisterDto} from "src/common/dto/User/register.dto";
import {AuthService} from "./index.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post("/login")
  @ApiBody({type: () => RegisterDto})
  login(@Body() dto: RegisterDto) {
    return this.service.login(dto);
  }

  @Post("/register")
  @ApiBody({type: () => RegisterDto})
  register(@Body() dto: RegisterDto) {
    return this.service.register(dto);
  }
}
