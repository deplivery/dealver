import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/orm/typeorm-ex.module';

import { UserService } from './facade/user.service';
import { UserRepository } from './infra/db/user.repository';
import { UsersController } from './infra/http/user.controller';
import { AuthService } from '../component/auth/auth.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository]), HttpModule],
  providers: [UserService, UserRepository, AuthService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
