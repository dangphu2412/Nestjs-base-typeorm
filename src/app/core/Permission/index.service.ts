import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/common/entity";
import { PermissionRepository } from "./index.repository";

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private repository: PermissionRepository
  ) {}
}