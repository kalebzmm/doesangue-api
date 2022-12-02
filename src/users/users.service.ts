import { Injectable, Inject, HttpException, HttpStatus, UnauthorizedException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { v4 as uuidv4 } from 'uuid'
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('User')
    private readonly usersRepository: typeof User,
    private readonly configService: ConfigService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne<User>({
      where: { email },
    });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findMe(userData) {
    const user = await this.usersRepository.findOne<User>({
      where: { id: userData.id },
    });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async authUser(user: AuthUserDto): Promise<UserDto> {
    const found_user = await this.findOneByEmail(user.email);
    if (!found_user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    const match = await bcrypt.compare(user.password, found_user.password);
    if(match) {
      return new UserDto(found_user);
    } else {
      throw new UnauthorizedException('Usuário e/ou senha incorretos');
    }
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne<User>({
      where: { id },
    });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return new UserDto(user);
  }

  async create(registerUserDto: RegisterUserDto) {
    const user = new User();
    user.id = uuidv4();
    user.email = registerUserDto.email.trim().toLowerCase();
    user.name = registerUserDto.name;
    user.birth = registerUserDto.birth;
    user.blood_type = registerUserDto.blood_type;
    user.password = await bcrypt.hash(registerUserDto.password, await bcrypt.genSalt());

    try {
      const userData = await user.save();
      return userData;
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException(`Já existe um usuário com o e-mail '${err.errors[0].value}'`)
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findByPk<User>(id);
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    user.name = updateUserDto.name || user.name;

    try {
      let data = await user.save();
      data = await this.usersRepository.findByPk<User>(id);
      return new UserDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    await user.destroy();
    return new UserDto(user);
  }

  async signToken(user: User) {
    const payload: any = {
      role: user.role,
      email: user.email,
      id: user.id,
    };

    return sign(payload, this.jwtPrivateKey, {});
  }
}
