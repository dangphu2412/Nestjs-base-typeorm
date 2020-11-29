import {ConflictException, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Role, User} from "src/common/entity";
import {UserService} from "../User/index.service";
import {BcryptService} from "src/global/bcrypt";
import {RegisterDto} from "src/common/dto/User";
import {UserError} from "src/common/constants";
import {LoginDto} from "src/common/dto/User/login.dto";
import {IJwtPayload, IUserInfo, IUserLoginResponse} from "src/common/interface/i.user";

@Injectable()
export class AuthService {
  constructor(
    private service: UserService,
    private jwtService: JwtService
  ) {}

  private getRoleNames(roles: Role[]): string[] {
    return roles.map(role => role.name);
  }

  private getloginResponse(user: User): IUserLoginResponse {
    const info: IUserInfo = {
      email: user.email,
      avatar: user.avatar,
      fullName: user.fullName,
      phone: user.phone,
      roles: this.getRoleNames(user.roles)
    }

    const payload: IJwtPayload = {
      userId: user.id
    }

    const loginResponse: IUserLoginResponse = {
      token: this.jwtService.sign(payload),
      ...info
    }

    return loginResponse;
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user: User = await this.service.findByEmail(email);
    if (!user || BcryptService.compare(pass, user.password)) {
      throw new UnauthorizedException()
    }
    return user;
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

    const user = await this.service.register(dto);
    return this.getloginResponse(user);
  }
}
