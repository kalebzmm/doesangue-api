import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiBearerAuth,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Schedule } from './schedules.model';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedules')
@ApiTags('Schedule')
@UseGuards(RolesGuard)
export class SchedulesController {
    constructor(
        private readonly SchedulesService: SchedulesService,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({type: [Schedule]})
    @ApiBearerAuth()
    @Roles('USER')
    async getAllSchedules() {
        return this.SchedulesService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({type: Schedule})
    @ApiBearerAuth()
    @Roles('USER')
    async getOneSchedule(@Param() params) {
        return this.SchedulesService.findOne(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Roles('USER')
    @ApiCreatedResponse({type: Schedule})
    async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
        return await this.SchedulesService.create(createScheduleDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOkResponse({type: Schedule})
    async updateWithAllParams(@Param() params, @Body() updateScheduleDto: UpdateScheduleDto) {
        return this.SchedulesService.update(params.id, updateScheduleDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard('jwt'))
    @Roles('ADMIN')
    @ApiBearerAuth()
    async deleteOneSchedule(@Param() params) {
        return this.SchedulesService.delete(params.id);
    }
}
