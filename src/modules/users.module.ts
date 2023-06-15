import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/shared/typeorm-ex.module';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../services/user.service';
import { UserController } from '../controller/user.controller';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  providers: [UserService],
  controllers: [UserController],
  exports: [],
})
export class UsersModule {}
