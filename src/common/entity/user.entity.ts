/* eslint-disable max-len */
import {
  Entity, PrimaryGeneratedColumn, Column,
  BeforeInsert, BeforeUpdate, Unique, ManyToMany
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "./role.entity";
import {BcryptService} from "../../global/bcrypt";
import {BaseActionDate} from "./base";
import {IsRequired} from "../decorators/isRequired.decorator";
import {Exclude} from "class-transformer";
import {IsMobilePhone, IsOptional, IsString, IsIn, IsDateString, IsBoolean, IsEmail} from "class-validator";
import {enumToArray} from "../../utils";
import {Gender, UserStatus} from "../enums";

@Entity("users")
@Unique(["email"])
export class User extends BaseActionDate {
      @ApiProperty({readOnly: true})
      @PrimaryGeneratedColumn()
      id: number;

      @ApiProperty({
        example: "Phu dep trai"
      })
      @Column()
      @IsRequired()
      fullName: string;

      @ApiProperty({
        example: "admin@gmail.com"
      })
      @IsRequired()
      @IsEmail()
      @Column()
      email: string;

      @Column()
      @IsRequired()
      password: string;

      @ApiProperty({
        example: "0371627261"
      })
      @IsOptional()
      @IsMobilePhone("vi-VN")
      @Column({
        nullable: true
      })
      phone: string;

      @ApiProperty({
        example: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRlUbAyS_643dq_B69jZAlPNW6_Xc7SLELY6SpRsc5OI2wHiiYG&usqp=CAU"
      })
      @IsOptional()
      @IsString()
      @Column({default: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRlUbAyS_643dq_B69jZAlPNW6_Xc7SLELY6SpRsc5OI2wHiiYG&usqp=CAU"})
      avatar: string;

      @ApiProperty({
        example: Gender.MALE
      })
      @IsRequired()
      @IsIn(enumToArray(Gender))
      @Column({
        type: "enum",
        enum: Gender,
        default: Gender.MALE
      })
      gender: string;

      @ApiProperty({
        example: new Date().toISOString()
      })
      @IsRequired()
      @IsDateString()
      @Column({
        nullable: true
      })
      birthday: Date;

      @ApiProperty({
        example: "Hello there"
      })
      @IsOptional()
      @IsString()
      @Column({nullable: true})
      bio: string;

      @ApiProperty({
        example: "Note something"
      })
      @IsOptional()
      @IsString()
      @Column({nullable: true})
      note: string;

      @ApiProperty({
        example: UserStatus.ACTIVE
      })
      @IsRequired()
      @IsIn(enumToArray(UserStatus))
      @Column({
        type: "enum",
        enum: UserStatus,
        default: UserStatus.ACTIVE
      })
      status: string;

      @Exclude()
      @ApiProperty({readOnly: true, writeOnly: true})
      @IsOptional()
      @IsBoolean()
      @Column({default: false})
      hasExpiredToken: boolean;

      @BeforeInsert()
      @BeforeUpdate()
      hashPwd() {
        this.password = BcryptService.hash(this.password);
      }

      /**
       * Relations
       */
      @ManyToMany(() => Role, role => role.users)
      roles: Role[]
}

