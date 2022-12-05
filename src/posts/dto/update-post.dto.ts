import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, IsString, IsUUID } from 'class-validator';

export class UpdatePostDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID('4')
    readonly id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly body: string;

    @ApiProperty()
    @IsString()
    readonly blood_type: string;
}