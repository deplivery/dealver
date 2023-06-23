import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => ({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: false,
  logging: process.env.NODE_ENV === 'local',
}));

// todo: Joi 검증을 여기서 하는게 아니라 환경변수 validation 을 다른 곳에서 하고 여기서 쓰는 식으로 변경
