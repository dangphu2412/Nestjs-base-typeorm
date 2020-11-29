import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UserService} from "src/app/core/User/index.service";
import {IJwtPayload} from "../interface/i.user";
import {JWT_CONFIG} from "src/env";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONFIG.SECRET
    });
  }

  async validate(payload: IJwtPayload) {
    const {userId} = payload;
    const user = await this.userService.findOne({
      where: {
        id: userId
      },
      relations: ["roles", "roles.permissions"]
    })
    if (!user) throw new UnauthorizedException()
    return user;
  }
}
