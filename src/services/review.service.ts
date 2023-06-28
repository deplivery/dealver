import { Injectable } from '@nestjs/common';
import { CreateReview, UpdateReview } from '../facade/user-review.facade';
import { ReviewRepository } from '../repository/review.repository';
import { Review } from '../entities/review.entity';
import { Order } from '../entities/order.entity';
import { InputError } from '../shared/error/input.error';

@Injectable()
export class ReviewService {
  constructor(private readonly repository: ReviewRepository) {}

  async getReview(storeId: number): Promise<Review[]> {
    return this.repository.findByStoreId(storeId);
  }

  async createReview(data: { userId: number; order: Order; input: CreateReview }) {
    const { userId, input, order } = data;
    if (!order.canWriteReview()) {
      throw new InputError('cannot write review');
    }
    const review = Review.of({ userId, ...input });
    return this.repository.save(review);
  }

  async updateReview(userId: number, input: UpdateReview): Promise<Review> {
    const review = await this.repository.findOne({ where: { id: input.reviewId } });
    if (!review) {
      throw new InputError('cannot find review');
    }
    if (!review.isMine(userId)) {
      throw new InputError('cannot update review');
    }
    review.change(input);
    return this.repository.save(review);
  }

  async removeReview(reviewId: number) {
    const review = await this.repository.findOne({ where: { id: reviewId } });
    if (!review) {
      throw new InputError('cannot find review');
    }
    return this.repository.remove(review);
  }
}
