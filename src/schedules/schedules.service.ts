import { Inject, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './schedules.model';

@Injectable()
export class SchedulesService {
    constructor(
        @Inject('Schedule')
        private readonly scheduleRepository: typeof Schedule,
    ) { }

    async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
        return this.scheduleRepository.create(createScheduleDto);
    }

    async findAll(): Promise<any> {
        return this.scheduleRepository.findAll();
    }

    async findOne(id: string): Promise<Schedule> {
        return this.scheduleRepository.findByPk(id);
    }

    async update(id: string, createScheduleDto: CreateScheduleDto): Promise<any> {
        return this.scheduleRepository.update(createScheduleDto, { where: {id: id} });
    }

    async delete(id: string): Promise<any> {
        return this.scheduleRepository.destroy({ where: {id: id} });
    }
}
