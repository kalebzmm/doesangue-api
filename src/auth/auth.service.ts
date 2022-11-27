import { JwtPayload } from './interfaces/jwt-payload.interface';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import * as Cryptr from 'cryptr';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  cryptr: any;

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.cryptr = new Cryptr(process.env.JWT_SECRET);
  }

  async createAccessToken(userId: string) {
    const accessToken = sign({userId}, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRATION });
    return this.encryptText(accessToken);
  }

  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    const user = await this.userService.findOne(jwtPayload.userId);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return user;
  }

  private jwtExtractor(request) {
    let token = null;
    if (request.header('x-token')) {
      token = request.get('x-token');
    } else if (request.headers.authorization) {
      token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
    } else if (request.body.token) {
      token = request.body.token.replace(' ', '');
    }
      if (request.query.token) {
      token = request.body.token.replace(' ', '');
    }
      const cryptr = new Cryptr(process.env.ENCRYPT_JWT_SECRET);
      if (token) {
        try {
          token = cryptr.decrypt(token);
        } catch (err) {
          throw new BadRequestException('Bad request.');
        }
    }
      return token;
  }

  returnJwtExtractor() {
    return this.jwtExtractor;
  }

  encryptText(text: string): string {
    return this.cryptr.encrypt(text);
  }
}
