import { User } from '../entities/user.entity';
import { CustomRepository } from '../shared/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { InputError } from '../shared/error/input.error';

@CustomRepository({ entity: User })
export class UserRepository extends Repository<User> {}
