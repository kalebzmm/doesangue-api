import { User } from './../user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../enums/roles.enum';

export class UserDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly role: Roles;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly birth: string;

  @ApiProperty()
  readonly blood_type: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.birth = user.birth;
    this.blood_type = user.blood_type;
    this.role = user.role;
  }
}