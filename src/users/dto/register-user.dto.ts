import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsString } from 'class-validator';
import { BloodTypes } from 'src/users/enums/blood-type.enum';

export class RegisterUserDto {

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsEnum(BloodTypes)
  readonly blood_type: string;

  @ApiProperty()
  @IsDateString()
  readonly birth: string;

}
