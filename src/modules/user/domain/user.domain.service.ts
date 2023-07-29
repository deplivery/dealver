import { Injectable } from '@nestjs/common';
import { catchError, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserDomain } from '@module/user/domain/user.domain';
import { UserRepository } from '@module/user/infra/db/user.repository';
import { notFoundError } from '@shared/error/not-found.error';
import { logger } from '@shared/service/logger.service';

@Injectable()
export class UserDomainService {
  constructor(private readonly userRepository: UserRepository) {}

  findById(id: number): Observable<UserDomain> {
    return this.userRepository.findById(id).pipe(
      map((userDomain: UserDomain | undefined) => {
        if (!userDomain) {
          throw new notFoundError(`User with id: ${id} not found`);
        }
        return userDomain;
      }),
      catchError((error) => {
        logger.error('[UserDomainService] findById() error:', error);
        throw new Error('[UserDomainService] findById() something went wrong');
      }),
    );
  }

  // todo: repository 부터 observable 가져오기
  createUser(user: UserDomain): Observable<any> {
    return from(this.userRepository.saveUser(user));
  }
}
