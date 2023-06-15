import { UsersEntity } from '../entities/user.entity';
import { QueryRunner, Repository } from 'typeorm';
import { CustomRepository } from '../shared/typeorm-ex.decorator';
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

@CustomRepository(UsersEntity)
export class UserRepository extends Repository<UsersEntity> {
  makeQueryBuilder(queryRunner?: QueryRunner) {
    return this.createQueryBuilder('users', queryRunner);
  }

  async findKakaoAuthId(id: string) {
    return this.makeQueryBuilder().where('users.kakao_auth_id=:id', { id }).getOne();
  }

  async kakaoCallback(tokenString: string): Promise<any> {
    const getProfileUrl = 'https://kapi.kakao.com/v2/user/me';

    const getProfileHeaders = {
      Authorization: `Bearer ${tokenString}`,
    };

    try {
      const response = await axios.post(
        getProfileUrl,
        {
          property_keys: ['properties.nickname', 'kakao_account.email'],
        },
        {
          headers: getProfileHeaders,
        },
      );

      if (!response.data.id) {
        throw new BadRequestException('카카오 토큰값을 확인해 주세요');
      }

      return response.data;
    } catch (error) {
      throw new BadRequestException('카카오 토큰값을 확인해 주세요');
    }
  }
}
