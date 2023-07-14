import { Repository } from 'typeorm';

import { CustomRepository } from '../../../../shared/orm/typeorm-ex.decorator';
import { Review } from '../../domain/entity/review.entity';

@CustomRepository({ entity: Review })
export class ReviewRepository extends Repository<Review> {
  async findByStoreId(storeId: number): Promise<Review[]> {
    return this.createQueryBuilder('review')
      .leftJoin('review.order', 'order')
      .where('order.storeId = :storeId', { storeId })
      .orderBy('review.createdAt', 'DESC')
      .getMany();
  }
}
