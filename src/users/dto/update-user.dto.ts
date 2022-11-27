import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsISO8601,
  IsInt,
  IsUUID,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly nome: string;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  readonly nascimento?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt({ each: true })
  readonly agencias: number[];

  @ApiProperty()
  @IsOptional()
  @IsInt({ each: true })
  readonly carteiras: number[];

  @ApiProperty()
  @IsOptional()
  @IsUUID('4', { each: true })
  readonly roles: string[];
}
