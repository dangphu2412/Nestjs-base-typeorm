import { Controller, Get } from '@nestjs/common';
import { RoleService } from './index.service';

@Controller('roles')
export class RoleController {
  constructor(private service: RoleService) {}
}
