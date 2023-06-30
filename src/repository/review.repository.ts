import { CustomRepository } from '../shared/typeorm-ex.decorator';
import { Review } from '../entities/review.entity';
import { Repository } from 'typeorm';

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
