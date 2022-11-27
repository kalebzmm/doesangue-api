import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'easy-db.ctoesfdrxzlm.sa-east-1.rds.amazonaws.com',
      port: 5432,
      username: 'admin',
      password: 'root',
      database: 'doesangue',
      schema: 'public',
      autoLoadModels: true,
      synchronize: true,
      timezone: 'America/Fortaleza',
      logging: true,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
