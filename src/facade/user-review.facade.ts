import { Injectable } from '@nestjs/common';
import { ReviewService } from '../modules/order/facade/review.service';
import { OrderService } from '../modules/order/facade/order.service';

export interface CreateReview {
  title: string;
  description: string;
  orderId: number;
  rating: number;
}

export interface UpdateReview {
  title?: string;
  description?: string;
  rating?: number;
  reviewId: number;
}

@Injectable()
export class UserReviewService {
  constructor(private readonly reviewService: ReviewService, private readonly orderService: OrderService) {}

  async createReview(user: { role: string; id: number }, input: CreateReview) {
    const order = await this.orderService.getOrder(input.orderId);
    return this.reviewService.createReview({ userId: user.id, order, input });
  }
}
