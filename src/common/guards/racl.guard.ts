import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {getFeature, getAction} from "@nestjsx/crud";
import {RaclHelper} from "src/database/seed-development/seed-helper/racl.helper";
import {TJwtPayload} from "../type";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: TJwtPayload = request.user;
    const {permissions} = user;
    const handler = context.getHandler();
    const controller = context.getClass();

    const feature = getFeature(controller);
    const action = getAction(handler);
    const requiredPermission: string = (new RaclHelper()).createPermission(feature, action);
    return this.isPermissionAllowed(requiredPermission, permissions);
  }

  private isPermissionAllowed(
    requiredPermission: string, currentPermissions: string[]
  ): boolean {
    const isSuperAdmin = currentPermissions
      .some(currPermission => currPermission === "ALL");
    if (isSuperAdmin) {
      return true;
    }
    return currentPermissions
      .some(currentPermission => currentPermission === requiredPermission);
  }
}
