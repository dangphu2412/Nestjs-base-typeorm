import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/common/entity";
import { RoleRepository } from "./index.repository";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private repository: RoleRepository
  ) {}
}