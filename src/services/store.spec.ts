import { StoreRepository } from './../repository/store.repository';
import { Test } from '@nestjs/testing';
import { StoreService } from './store.service';
import { MockedValueProvider, mockProvider } from '../../test/util/mock';
import { Store } from '../entities/store.entity';
import { PermissionError } from '../shared/error/permission.error';
import { InputError } from '../shared/error/input.error';

describe('store', () => {
  let service: StoreService;
  let storeRepository: MockedValueProvider<StoreRepository>;

  beforeAll(async () => {
    storeRepository = mockProvider(StoreRepository);
    const app = (
      await Test.createTestingModule({
        imports: [],
        providers: [StoreService, storeRepository],
      }).compile()
    ).createNestApplication();
    await app.init();
    service = app.get<StoreService>(StoreService);
  });

  beforeAll(() => {
    storeRepository.useValue.findByAddress.mockImplementation(() => undefined);
  });

  describe('가게 생성', () => {
    it('가게는 관리자와 점주만 생성할수 있다.', async () => {
      const user = { role: 'admin' };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      const result = await service.createStore(user, input);
      expect(result).toBe(true);
    });

    it('가게는 관리자와 점주만 생성할수 있다.', async () => {
      const user = { role: 'owner' };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      const result = await service.createStore(user, input);
      expect(result).toBe(true);
    });

    it('가게는 관리자와 점주만 생성할수 있다.', async () => {
      const user = { role: 'customer' };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      expect(async () => {
        await service.createStore(user, input);
      }).rejects.toThrowError(new PermissionError('권한이 없습니다.'));
    });

    it('가게 정보에서 영업시간 < 영업 마감시간 생성할수 있다.', async () => {
      const user = { role: 'owner' };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      const result = await service.createStore(user, input);
      expect(result).toBe(true);
    });

    it('가게 정보에서 영업시간 >= 영업 마감시간 생성할수 없다.', async () => {
      const user = { role: 'owner' };
      const input = { name: 'test', address: 'test', startHour: 3, endHour: 2 };
      expect(async () => {
        await service.createStore(user, input);
      }).rejects.toThrowError(new InputError('영업시간이 영업 마감시간보다 늦습니다.'));
    });

    it('가게 주소는 unique 해야한다.', async () => {
      const user = { role: 'owner' };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      const result = await service.createStore(user, input);
      expect(result).toBe(true);
    });

    it('가게 주소가 존재하면 가게를 생성할수 없다.', async () => {
      const user = { role: 'owner' };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      storeRepository.useValue.findByAddress.mockImplementation(async () => new Store());
      expect(async () => {
        await service.createStore(user, input);
      }).rejects.toThrowError(new InputError('이미 존재하는 가게입니다.'));
    });
  });
});
