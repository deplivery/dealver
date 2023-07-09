import { MockedValueProvider } from '../../../../test/util/mock';
import { Test } from '@nestjs/testing';
import { mockProvider } from '../../../../test/util/mock';
import { ReviewRepository } from '../infra/db/review.repository';
import { ReviewService } from './review.service';
import { Review } from '../domain/entity/review.entity';
import { UpdateReview } from './user-review.facade';
import { Order } from '../domain/entity/order.entity';

describe('ReviewService', () => {
  let repository: MockedValueProvider<ReviewRepository>;
  let service: ReviewService;

  beforeAll(async () => {
    repository = mockProvider(ReviewRepository);
    const app = (
      await Test.createTestingModule({
        imports: [],
        providers: [ReviewService, repository],
      }).compile()
    ).createNestApplication();
    await app.init();
    service = app.get<ReviewService>(ReviewService);
  });

  describe('createReview', () => {
    it('order가 리뷰를 쓸 수 없는 상태면 InputError를 던진다', async () => {
      const userId = 1;
      const input = { description: 'content', rating: 4, orderId: 1, title: 'title' };
      const order = { checkWriteReview: () => false } as Order;
      const createReview = service.createReview({ userId, input, order });
      await expect(createReview).rejects.toThrow('cannot write review');
    });

    it('order가 리뷰를 쓸 수 있는 상태면 리뷰를 생성한다', async () => {
      const userId = 1;
      const input = { description: 'content', rating: 4, orderId: 1, title: 'title' };
      const order = { checkWriteReview: () => true } as Order;
      const review = { id: 1 };
      repository.useValue.save.mockImplementation(async () => review as Review);
      const result = await service.createReview({ userId, input, order });
      expect(result).toBe(review);
    });
  });

  describe('updateReview', () => {
    it('review가 없으면 InputError를 던진다', async () => {
      const input = { description: 'content', rating: 4, orderId: 1, title: 'title', reviewId: 1 };
      repository.useValue.findOne.mockImplementation(async () => undefined);
      const updateReview = service.updateReview(1, input);
      await expect(updateReview).rejects.toThrow('cannot find review');
    });

    it('review가 내것이 아니면 InputError를 던진다.', async () => {
      const userId = 1;
      const input = { description: 'content', rating: 4, orderId: 1, title: 'title', reviewId: 1 };
      const review = {
        id: 1,
        isMine: (userId: number) => false,
      };
      repository.useValue.findOne.mockImplementation(async () => review as Review);
      const updateReview = service.updateReview(userId, input);
      await expect(updateReview).rejects.toThrow('cannot update review');
    });

    it('review가 있으면 리뷰를 수정한다', async () => {
      const userId = 1;
      const input = { description: 'content', rating: 4, orderId: 1, title: 'title', reviewId: 1 };

      const review = {
        id: 1,
        isMine: (userId: number) => true,
        change: (input: UpdateReview) => {
          return void 0;
        },
      };
      repository.useValue.findOne.mockImplementation(async () => review as Review);
      repository.useValue.save.mockImplementation(async () => review as Review);

      const result = await service.updateReview(userId, input);
      expect(result).toBe(review);
    });
  });

  describe('removeReview', () => {
    it('review가 없으면 InputError를 던진다', async () => {
      const reviewId = 1;
      repository.useValue.findOne.mockImplementation(async () => undefined);
      const removeReview = service.removeReview(reviewId);
      await expect(removeReview).rejects.toThrow('cannot find review');
    });

    it('review가 있으면 리뷰를 삭제한다', async () => {
      const reviewId = 1;
      const review = { id: 1 };
      repository.useValue.findOne.mockImplementation(async () => review as Review);
      repository.useValue.remove.mockImplementation(async () => review as Review);

      const result = await service.removeReview(reviewId);
      expect(result).toBe(review);
    });
  });
});
