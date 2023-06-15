import { Module } from '@nestjs/common';
import Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { UsersEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? 'dev.env' : 'local.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('local', 'dev').required(),
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.string().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        // TODO:
        // 물론 전체 경로 잡아서 이부분 생략할 수 있습니다. 차후 적용하면 될것 같습니다.
        UsersEntity,
      ],
      autoLoadEntities: true,
      charset: 'utf8mb4',
      synchronize: false,
      logging: process.env.NODE_ENV === 'local',
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
