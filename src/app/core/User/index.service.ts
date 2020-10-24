import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Override} from "@nestjsx/crud";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm/lib/typeorm-crud.service";
import {UserError} from "src/common/constants";
import {RegisterDto} from "src/common/dto/User";
import {User} from "src/common/entity";
import {UserRepository} from "./index.repository";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private repository: UserRepository
  ) {
    super(repository);
  }

  findByUsername(username: string): Promise<User> {
    return this.repository.findOne({
      where: {
        username
      }
    })
  }

  @Override("createOneBase")
  createOneBase(user: RegisterDto): Promise<User> {
    return this.repository.create(
      {
        email: user.email,
        password: user.password
      }
    ).save();
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
