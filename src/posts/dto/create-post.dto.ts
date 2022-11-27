import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';

export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly body: string;

    @IsString()
    readonly blood_type: string;
}