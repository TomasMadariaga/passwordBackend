import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin: [
      'https://passwordgenerator-luuy4xcwj-tomas-projects-e1b665dc.vercel.app',
      'https://passwordgenerator-tomas-projects-e1b665dc.vercel.app',
      'https://tomas-password-generator.netlify.app'
    ],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
