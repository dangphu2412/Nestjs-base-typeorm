import {
  hashSync,
  compareSync
} from "bcrypt";
import {SALT_ROUNDS} from "../env";

class Service {
  private saltRounds: number;

  constructor(config: number) {
    this.saltRounds = config;
  }

  hash(data: string): string {
    return hashSync(data, this.saltRounds);
  }

  compare(data: string, ecrypted: string): boolean {
    return compareSync(data, ecrypted);
  }
}

export const BcryptService = new Service(SALT_ROUNDS);
