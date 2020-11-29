import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm/lib/typeorm-crud.service";
import {RegisterDto} from "src/common/dto/User";
import {User} from "src/common/entity";
import {ERole} from "src/common/enums";
import {FindOneOptions} from "typeorm";
import {RoleService} from "../Role/index.service";
import {UserRepository} from "./index.repository";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private repository: UserRepository,
    private roleService: RoleService
  ) {
    super(repository);
  }

  findByEmail<T>(email: string, options?: FindOneOptions<T>) {
    return this.repository.findOne({
      where: {
        email
      },
      relations: options?.relations || ["roles", "roles.permissions"]
    })
  }

  async register(user: RegisterDto): Promise<User> {
    const internRole = await this.roleService.findOne({
      where: {
        name: ERole.INTERN
      },
      relations: ["permissions"]
    });
    return this.repository.create(
      {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        roles: [internRole]
      }
    ).save();
  }
}
