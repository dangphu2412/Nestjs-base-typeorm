import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class RegisterDto {
  @ApiProperty({
    example: "phupro123@gmail.com"
  })
  @IsString()
  public email: string;

  @ApiProperty({
    example: "phudeptrai"
  })
  @IsString()
  public fullName: string;

  @ApiProperty({
    example: "123123"
  })
  @IsString()
  public password: string;
}
