import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {getFeature, getAction} from "@nestjsx/crud";
import {RaclHelper} from "src/database/seed-development/seed-helper/racl.helper";
import {Role, User} from "../entity";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const roles = user.roles;

    const handler = context.getHandler();
    const controller = context.getClass();

    const feature = getFeature(controller);
    const action = getAction(handler);
    const requiredPermission: string = (new RaclHelper()).createPermission(feature, action);

    this.assignUserToRequest(request, user);
    return this.isPermissionAllowed(requiredPermission, roles);
  }

  private isPermissionAllowed(
    requiredPermission: string, roles: Role[]
  ): boolean {
    return roles.some(role => {
      return role.permissions
        .some(permission => permission.name === "ALL" || permission.name === requiredPermission);
    })
  }

  private assignUserToRequest(request: any, user: User): void {
    request.user = user;
  }
}
