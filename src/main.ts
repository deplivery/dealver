import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerSetting } from './shared/swagger-config';
import passport from 'passport';

declare const module: any;

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.HOST || 8000;

  app.useGlobalPipes(new ValidationPipe());

  SwaggerSetting(app);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(passport.initialize());
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
