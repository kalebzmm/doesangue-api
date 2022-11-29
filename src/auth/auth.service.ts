import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService) {}

  async createAccessToken(user: UserDto) {
    const accessToken = sign({id: user.id, role: user.role}, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRATION });
    return accessToken;
  }

  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    const user = await this.userService.findOne(jwtPayload.id);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return user;
  }

  private jwtExtractor(request) {
    if(!request.headers.authorization) throw new UnauthorizedException()
    const token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
    return token;
  }

  returnJwtExtractor() {
    return this.jwtExtractor;
  }

}
