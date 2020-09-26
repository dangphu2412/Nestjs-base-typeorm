import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './index.service';

@Controller('permissions')
export class PermissionController {
  constructor(private service: PermissionService) {}
}
