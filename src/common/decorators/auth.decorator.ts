import {applyDecorators, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {JwtAuthGuard} from "../guards/jwt.guard";
import {PermissionGuard} from "../guards/racl.guard";

export function GrantAccess() {
  return applyDecorators(
    UseGuards(JwtAuthGuard, PermissionGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({description: "Unauthorized"}),
  );
}
