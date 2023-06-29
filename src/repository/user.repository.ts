import { UserEntity } from '../entities/user.entity';
import { CustomRepository } from '../shared/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { InputError } from '../shared/error/input.error';

@CustomRepository({ entity: UserEntity })
export class UserRepository extends Repository<UserEntity> {}
