import {applyDecorators, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {Action} from "@nestjsx/crud";
import {JwtAuthGuard} from "../guards/jwt.guard";
import {PermissionGuard} from "../guards/racl.guard";
import {TRaclOptions} from "../type";

export function GrantAccess({
  action,
  jwtOnly = false
}: TRaclOptions) {
  return applyDecorators(
    Action(action),
    jwtOnly ? UseGuards(JwtAuthGuard) : UseGuards(JwtAuthGuard, PermissionGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({description: "Unauthorized"}),
  );
}
