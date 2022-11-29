import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, { provide: 'User', useValue: User }],
  exports: [UsersService],
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule)]
})
export class UsersModule {}
