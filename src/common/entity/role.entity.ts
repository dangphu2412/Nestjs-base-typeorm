import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToMany, JoinTable
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Permission} from "./permission.entity";
import {User} from "./user.entity";
import {BaseActionDate} from "./base";
import {IsRequired} from "../decorators/isRequired.decorator";

@Entity("roles")
export class Role extends BaseActionDate {
    @ApiProperty({readOnly: true})
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsRequired()
    name: string;

    // Relations
    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable({
      name: "role_permissions",
      joinColumn: {
        name: "roleId",
        referencedColumnName: "id"
      },
      inverseJoinColumn: {
        name: "permissionId",
        referencedColumnName: "id"
      }
    })
    permissions: Permission[]

    @ManyToMany(() => User, user => user.roles)
    @JoinTable({
      name: "user_roles",
      joinColumn: {
        name: "roleId",
        referencedColumnName: "id"
      },
      inverseJoinColumn: {
        name: "userId",
        referencedColumnName: "id"
      }
    })
    users: User[]
}
