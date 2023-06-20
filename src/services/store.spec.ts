import { Test } from '@nestjs/testing';
import { StoreService } from './store.service';

describe('store', () => {
  let service: StoreService;

  beforeAll(async () => {
    const app = (
      await Test.createTestingModule({
        imports: [],
        providers: [StoreService],
      }).compile()
    ).createNestApplication();
    await app.init();
    service = app.get<StoreService>(StoreService);
  });

  describe('가게 생성', () => {
    it('가게는 관리자와 점주만 생성할수 있다.', () => {
      expect(service.createStore()).toBe(true);
    });
  });
});
