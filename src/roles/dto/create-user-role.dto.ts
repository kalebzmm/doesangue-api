/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class createUserRoleDto {

  @IsNotEmpty()
  @IsUUID('4')
  @ApiProperty()
  id_user: string;

  @IsNotEmpty()
  @IsUUID('4')
  @ApiProperty()
  id_role: string;

}
