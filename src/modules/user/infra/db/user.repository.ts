import { Repository } from 'typeorm';

import { CustomRepository } from '../../../../shared/orm/typeorm-ex.decorator';
import { User } from '../../domain/entity/user.entity';

@CustomRepository({ entity: User })
export class UserRepository extends Repository<User> {}
