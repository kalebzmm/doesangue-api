import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';

export class CreatePostDto {

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