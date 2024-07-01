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

  app.enableCors({
    credentials: true,
    origin: [
      'passwordgenerator-qwwt0uki1-tomas-projects-e1b665dc.vercel.app',
      'passwordgenerator-tomas-projects-e1b665dc.vercel.app',
      '.vercel.app',
    ],
  });

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
