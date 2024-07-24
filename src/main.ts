import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser())
  app.enableCors({
    origin: "*",
    credentials: true,
  })
  await app.listen(3000);
}
bootstrap();
