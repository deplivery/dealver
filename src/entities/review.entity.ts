import { CreateReview } from '../facade/user-review.facade';
import { InputError } from '../shared/error/input.error';

export class Review {
  id: number;
  userId: number;
  orderId: number;
  title: string;
  description: string;
  rating: number;

  static of(input: CreateReview & { userId: number }) {
    if (input.description.length > 200) {
      throw new InputError('description is too long');
    }
    if (input.rating < 1 || input.rating > 5) {
      throw new InputError('rating is not valid');
    }
    const review = new Review();
    review.userId = input.userId;
    review.orderId = input.orderId;
    review.title = input.title;
    review.description = input.description;
    return review;
  }

  change(input: { title?: string; description?: string; rating?: number }) {
    if (input.description && input.description.length > 200) {
      throw new InputError('description is too long');
    }
    if (input.rating && (input.rating < 1 || input.rating > 5)) {
      throw new InputError('rating is not valid');
    }
    if (input.title) {
      this.title = input.title;
    }
    if (input.description) {
      this.description = input.description;
    }
    if (input.rating) {
      this.rating = input.rating;
    }
  }
}
