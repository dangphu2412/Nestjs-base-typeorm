import { Controller, Get } from '@nestjs/common';

@Controller()
export class BaseController {
  constructor(private readonly appService: any) {}
}
