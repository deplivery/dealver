import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerSetting } from './shared/swagger-config';
import { logger } from './shared/service/logger.service';

declare const module: any;

async function bootstrap() {
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
