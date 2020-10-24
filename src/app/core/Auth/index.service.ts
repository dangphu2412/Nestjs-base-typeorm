import {TJwtPayload} from "../../../common/type";
import {ConflictException, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {User} from "src/common/entity";
import {IUserInfo, IUserLoginResponse} from "src/common/interface/t.jwtPayload";
import {UserService} from "../User/index.service";
import {BcryptService} from "src/global/bcrypt";
import {RegisterDto} from "src/common/dto/User";
import {UserError} from "src/common/constants";

@Injectable()
export class AuthService {
  constructor(
    private service: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user: User = await this.service.findOne({
      where: {
        email
      },
      relations: ["role"]
    });
    if (user && BcryptService.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(dto: RegisterDto): Promise<IUserLoginResponse> {
    const user = await this.validateUser(dto.email, dto.password);
    const info: IUserInfo = {
      email: user.email,
      avatar: user.avatar,
      fullName: user.fullName,
      phone: user.phone
    }
    const payload: TJwtPayload = {
      userId: user.id,
      role: user.role.name,
      permissions: user.role.permissions
    }
    const loginResponse: IUserLoginResponse = {
      token: this.jwtService.sign(payload),
      ...info
    }
    return loginResponse;
  }

  async register(user: RegisterDto): Promise<User> {
    const {email} = user;
    const isExisted = await this.service.findByUsername(email);

    if (isExisted) {
      throw new ConflictException(UserError.ConflictExisted);
    }

    return this.service.createOneBase(user);
  }
}
