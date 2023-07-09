import { User } from '../../domain/entity/user.entity';
import { CustomRepository } from '../../../../shared/orm/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository({ entity: User })
export class UserRepository extends Repository<User> {}
