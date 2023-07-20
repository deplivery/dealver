import { Injectable } from '@nestjs/common';

import { UserRepository } from '@module/user/infra/db/user.repository';

@Injectable()
export class UserDomainService {
  constructor(private readonly userRepository: UserRepository) {}
}
