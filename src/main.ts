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
    origin: 'passwordgenerator-9cxnofp7s-tomas-projects-e1b665dc.vercel.app',
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
