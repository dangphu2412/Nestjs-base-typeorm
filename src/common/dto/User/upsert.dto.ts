import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class UpsertUserDto {
  @ApiProperty({
    example: "Phu dep trai"
  })
  @IsString()
  public username: string;

  @ApiProperty({
    example: "123123"
  })
  @IsString()
  public password: string;
}
