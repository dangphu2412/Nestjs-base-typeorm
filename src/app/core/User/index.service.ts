import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Override} from "@nestjsx/crud";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm/lib/typeorm-crud.service";
import {UserError} from "src/common/constants";
import {RegisterDto} from "src/common/dto/User";
import {User} from "src/common/entity";
import {ERole} from "src/common/enums";
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

  findByEmail(email: string): Promise<User> {
    return this.repository.findOne({
      where: {
        email
      }
    })
  }

  @Override("createOneBase")
  async createOneBase(user: RegisterDto): Promise<User> {
    const internRole = await this.roleService.findOne({
      where: {
        name: ERole.INTERN
      },
      relations: ["permissions"]
    });
    const userResponse = await this.repository.create(
      {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        roles: [internRole]
      }
    ).save();
    return userResponse;
  }

  async restoreUser(id: string, currentUser: User) {
    const record = await this.repository.findOne(id, {
      withDeleted: true
    });
    if (!record) throw new NotFoundException(UserError.NotFound)
    if (parseInt(id, 10) === currentUser.id) {
      throw new ConflictException(UserError.ConflictSelf);
    }
    if (record.deletedAt === null) throw new ConflictException(UserError.ConflictRestore);
    await this.repository.restore(record);
  }
}
