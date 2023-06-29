import { TypeOrmExModule } from '../shared/typeorm-ex.module';
import { UserRepository } from '../repository/user.repository';
import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UsersController } from '../controller/user.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository]), HttpModule],
  providers: [UserService, UserRepository, AuthService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
