import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BaseService} from "src/app/concept/service";
import {Role} from "src/common/entity";
import {RoleRepository} from "./index.repository";

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    public repository: RoleRepository
  ) {
    super(repository);
  }
}
