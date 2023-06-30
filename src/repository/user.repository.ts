import { CustomRepository } from '../shared/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';

@CustomRepository({ entity: UserEntity })
export class UserRepository extends Repository<UserEntity> {}
