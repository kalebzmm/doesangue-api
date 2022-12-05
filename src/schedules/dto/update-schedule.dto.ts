import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsUUID } from 'class-validator';

export class UpdateScheduleDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID('4')
    readonly id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    readonly date: string;

}