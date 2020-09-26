import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/common/dto/User/create.dto";
import { User } from "src/common/entity";
import { UserRepository } from "./index.repository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: UserRepository
  ) {}

  findOne(username: string): Promise<User> {
    return this.repository.findOne({
      where: {
        username,
      }
    })
  }

  createOne(user: CreateUserDto): Promise<User> {
    return this.repository.create(
      {
        username: user.username,
        password: user.password,
      }
    ).save();
  }
}