import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateScheduleDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    readonly date: string;

}