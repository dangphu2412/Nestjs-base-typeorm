import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/common/dto/User/create.dto";
import { User } from "src/common/entity";
import { UserService } from "../User/index.service";

@Injectable()
export class AuthService {
  constructor(
    private service: UserService,
    private jwtService: JwtService
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.service.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto): Promise<User> {
    const { username } = user;
    const isExisted = await this.service.findOne(username);

    if (isExisted) throw new ConflictException('User existed');

    return this.service.createOne(user);
  }
}