import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';

import { UserDomain } from '@module/user/domain/user.domain';
import { UserRepository } from '@module/user/infra/db/user.repository';

@Injectable()
export class UserDomainService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(user: UserDomain): Observable<any> {
    return from(this.userRepository.saveUser(user));
  }
}
