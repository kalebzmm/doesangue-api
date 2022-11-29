import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsISO8601,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  readonly birth?: string;

  @ApiProperty()
  @IsOptional()
  readonly role: string[];
}
