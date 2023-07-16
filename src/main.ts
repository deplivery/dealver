import * as process from 'process';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import AWS from 'aws-sdk';

import { logger } from '@shared/service/logger.service';
import { SwaggerSetting } from '@shared/swagger-config';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  // Set AWS config before creating NestFactory
  AWS.config.credentials = new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  AWS.config.update({
    region: process.env.AWS_REGION,
  });

  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  SwaggerSetting(app);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.HOST || 8000;
  const env = process.env.NODE_ENV;
  await app.listen(port);

  logger.log(`The application is running in ${env} mode on port: ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
