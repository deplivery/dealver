import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../../shared/typeorm-ex.module';
import { UserRepository } from './infra/db/user.repository';
import { UsersController } from './infra/http/user.controller';
import { UserService } from './facade/user.service';
import { AuthService } from '../../services/auth.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository]), HttpModule],
  providers: [UserService, UserRepository, AuthService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
