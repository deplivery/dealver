import { TypeOrmExModule } from '../shared/typeorm-ex.module';
import { UserRepository } from '../repository/user.repository';
import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UsersController } from '../controller/user.controller';
import { HttpModule } from '@nestjs/axios';
import { RedisService } from '../infra/redis.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository]), HttpModule],
  providers: [UserService, AuthService, RedisService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
