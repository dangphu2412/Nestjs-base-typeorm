import { Controller, Get } from '@nestjs/common';
import { UserService } from './index.service';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}
}
