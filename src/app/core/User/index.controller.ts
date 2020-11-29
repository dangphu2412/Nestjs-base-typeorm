import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";
import {Crud, CrudController, Feature} from "@nestjsx/crud";
import {UpsertUserDto} from "src/common/dto/User/upsert.dto";
import {User} from "src/common/entity";
import {UserService} from "./index.service";
import {ECrudFeature} from "src/common/enums";

@Crud({
  model: {
    type: User
  },
  query: {
    exclude: ["password"],
    join: {
      roles: {
        eager: true
      },
      "roles.permissions": {
        eager: true
      }
    }
  },
  dto: {
    create: UpsertUserDto,
    update: UpsertUserDto,
    replace: UpsertUserDto
  },
  routes: {
    exclude: ["createManyBase"]
  }
})
@Feature(ECrudFeature.USER)
@ApiTags("Users")
@Controller("users")
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
