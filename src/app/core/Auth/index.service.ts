import {TJwtPayload} from "../../../common/type";
import {ConflictException, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Role, User} from "src/common/entity";
import {IUserInfo, IUserLoginResponse} from "src/common/interface/t.jwtPayload";
import {UserService} from "../User/index.service";
import {BcryptService} from "src/global/bcrypt";
import {RegisterDto} from "src/common/dto/User";
import {UserError} from "src/common/constants";
import {LoginDto} from "src/common/dto/User/login.dto";
import {flatMap} from "lodash";

@Injectable()
export class AuthService {
  constructor(
    private service: UserService,
    private jwtService: JwtService
  ) {}

  private getRoleNames(roles: Role[]): string[] {
    return roles.map(role => role.name);
  }

  private getPermissions(roles: Role[]): string[] {
    return flatMap(roles, role => {
      return role.permissions.map(permission => permission.name);
    });
  }

  private getloginResponse(user: User): IUserLoginResponse {
    const info: IUserInfo = {
      email: user.email,
      avatar: user.avatar,
      fullName: user.fullName,
      phone: user.phone,
      roles: this.getRoleNames(user.roles)
    }
    const payload: TJwtPayload = {
      userId: user.id,
      permissions: this.getPermissions(user.roles)
    }
    const loginResponse: IUserLoginResponse = {
      token: this.jwtService.sign(payload),
      ...info
    }
    return loginResponse;
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user: User = await this.service.findOne({
      where: {
        email
      },
      relations: ["roles", "roles.permissions"]
    });
    if (user && BcryptService.compare(pass, user.password)) {
      return user;
    }
    throw new UnauthorizedException(UserError.Unauthorized)
  }

  async login(dto: LoginDto): Promise<IUserLoginResponse> {
    const user = await this.validateUser(dto.email, dto.password);
    return this.getloginResponse(user);
  }

  async register(dto: RegisterDto): Promise<IUserLoginResponse> {
    const {email} = dto;
    const isExisted = await this.service.findByEmail(email);

    if (isExisted) {
      throw new ConflictException(UserError.ConflictExisted);
    }

    const user = await this.service.createOneBase(dto);
    return this.getloginResponse(user);
  }
}
