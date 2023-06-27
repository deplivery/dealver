import { MockedValueProvider } from './../../test/util/mock';
import { Test } from '@nestjs/testing';
import { mockProvider } from '../../test/util/mock';
import { ReviewRepository } from '../repository/review.repository';
import { ReviewService } from './review.service';

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
});
