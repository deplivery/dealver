import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from 'process';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { SwaggerSetting } from './shared/swaggerConfig';
import passport from 'passport';

declare const module: any;

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.HOST || 8000;

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  SwaggerSetting(app);

  app.use(cookieParser());
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use('/public', express.static(join(__dirname, '../public')));

  app.use(passport.initialize());
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
