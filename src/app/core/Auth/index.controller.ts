import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/common/dto/User/create.dto';
import { LocalAuthGuard } from 'src/common/guards/local.guard';
import { AuthService } from './index.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Body() dto: CreateUserDto) {
    return this.service.login(dto);
  }

  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.service.register(dto);
  }
}
