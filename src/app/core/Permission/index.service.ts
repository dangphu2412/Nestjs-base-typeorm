import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BaseService} from "src/app/concept/service";
import {Permission} from "src/common/entity";
import {PermissionRepository} from "./index.repository";

@Injectable()
export class PermissionService extends BaseService<Permission>{
  constructor(
    @InjectRepository(Permission)
    public repository: PermissionRepository
  ) {
    super(repository);
  }
}
