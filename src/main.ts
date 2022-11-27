import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Doe Sangue')
    .setDescription('API do app Doe Sangue')
    .setVersion('1.0')
    .addBearerAuth({
      in: 'header',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .setExternalDoc('Postman Collection', '/explorer-json')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Doe Sangue Explorer',
  };
  SwaggerModule.setup('explorer', app, document, customOptions);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const server = await app.listen(process.env.PORT || 3001);
  server.setTimeout(1800000); // 600,000=> 10Min, 1200,000=>20Min, 1800,000=>30Min
}
bootstrap();
