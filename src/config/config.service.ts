import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get jwtConfig() {
    return { privateKey: process.env.JWT_PRIVATE_KEY };
  }
}
