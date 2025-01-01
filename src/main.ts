import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import  *  as cookieParser from 'cookie-parser';

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
    origin: [
      'https://password-frontend-eta.vercel.app',
      'https://tomas-password-generator.netlify.app',
      'https://passwordgenerator-if5euk0z8-tomas-projects-e1b665dc.vercel.app',
      'http://localhost:5173',
      'https://password-generator-4w2h84d6f-tomas-projects-e1b665dc.vercel.app',
      'https://password-generator-ar.vercel.app'
    ],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
