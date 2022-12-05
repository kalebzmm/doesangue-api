import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Schedule } from './schedules.model';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService, { provide: 'Schedule', useValue: Schedule }],
  exports: [SchedulesService],
  imports: [SequelizeModule.forFeature([Schedule])]
})
export class SchdeulesModule {}
