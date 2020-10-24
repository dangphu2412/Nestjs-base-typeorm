import {UserService} from "./index.service";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserController} from "./index.controller";
import {UserRepository} from "./index.repository";
import {RoleRepository} from "../Role/index.repository";
import {RoleService} from "../Role/index.service";

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        UserRepository,
        RoleRepository
      ])
  ],
  controllers: [UserController],
  providers: [UserService, RoleService],
  exports: [UserService]
})
export class UserModule {}
