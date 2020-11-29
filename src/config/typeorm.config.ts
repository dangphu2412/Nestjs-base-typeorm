import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {DB_URI} from "../env";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  url: DB_URI,
  synchronize: false,
  logging: process.env.NODE_ENV === "production" ? false : true,
  entities: ["dist/**/*.entity{.ts,.js}"]
};
