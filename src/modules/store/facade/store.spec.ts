import { StoreRepository } from '../infra/db/store.repository';
import { Test } from '@nestjs/testing';
import { StoreService } from './store.service';
import { MockedValueProvider, mockProvider } from '../../../../test/util/mock';
import { PermissionError } from '../../../shared/error/permission.error';
import { InputError } from '../../../shared/error/input.error';
import { Store } from '../domain/entity/store.entity';

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

  describe('가게 생성', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      storeRepository.useValue.findByAddress.mockImplementation(() => undefined);
      storeRepository.useValue.save.mockImplementation(async (store: Store) => store);
    });

    it('가게는 관리자와 점주만 생성할수 있다.', async () => {
      const user = { role: 'admin', id: 1 };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      const result = await service.createStore(user, input);
      expect(result).toBeInstanceOf(Store);
    });

    it('가게는 관리자와 점주만 생성할수 있다.', async () => {
      const user = { role: 'owner', id: 1 };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      const result = await service.createStore(user, input);
      expect(result).toBeInstanceOf(Store);
    });

    it('가게는 관리자와 점주만 생성할수 있다.', async () => {
      const user = { role: 'customer', id: 1 };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      expect(async () => {
        await service.createStore(user, input);
      }).rejects.toThrowError(new PermissionError('권한이 없습니다.'));
    });

    it('가게 정보에서 영업시간 < 영업 마감시간 생성할수 있다.', async () => {
      const user = { role: 'owner', id: 1 };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      const result = await service.createStore(user, input);
      expect(result).toBeInstanceOf(Store);
    });

    it('가게 정보에서 영업시간 >= 영업 마감시간 생성할수 없다.', async () => {
      const user = { role: 'owner', id: 1 };
      const input = { name: 'test', address: 'test', startHour: 3, endHour: 2 };
      expect(async () => {
        await service.createStore(user, input);
      }).rejects.toThrowError(new InputError('영업시간이 영업 마감시간보다 늦습니다.'));
    });

    it('가게 주소는 unique 해야한다.', async () => {
      const user = { role: 'owner', id: 1 };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      const result = await service.createStore(user, input);
      expect(result).toBeInstanceOf(Store);
    });

    it('가게 주소가 존재하면 가게를 생성할수 없다.', async () => {
      const user = { role: 'owner', id: 1 };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      storeRepository.useValue.findByAddress.mockImplementation(async () => new Store());
      expect(async () => {
        await service.createStore(user, input);
      }).rejects.toThrowError(new InputError('이미 존재하는 가게입니다.'));
    });

    it('가게를 관리자가 생성할 때 Confirm 확인요청이 저장됨', async () => {
      const user = { role: 'admin', id: 50 };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      await service.createStore(user, input);
      expect(storeRepository.useValue.saveConfirm).toBeCalled();
      expect(storeRepository.useValue.saveConfirm.mock.calls[0][0]).toMatchObject({
        state: 'Confirm',
        reason: '',
        checkerId: user.id,
      });
    });

    it('가게를 점주가 생성할 때 Ready 확인요청이 저장됨', async () => {
      const user = { role: 'owner', id: 100 };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2 };
      await service.createStore(user, input);
      expect(storeRepository.useValue.saveConfirm.mock.calls[0][0]).toMatchObject({
        state: 'Ready',
        reason: '',
        checkerId: user.id,
      });
    });
  });

  describe('가게 수정', () => {
    beforeAll(() => {
      jest.clearAllMocks();
      storeRepository.useValue.findById.mockImplementation(async (id) => {
        const store = Store.of({ name: 'test', address: 'test', startHour: 1, endHour: 2 });
        return store;
      });
    });

    it('가게 정보는 관리자가 수정할수 있다.', async () => {
      const user = { role: 'admin', id: 1 };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2, storeId: 1 };

      const result = await service.updateStore(user, input);
      expect(result).toBeInstanceOf(Store);
    });

    it('가게 정보는 점주가 수정할수 있다.', async () => {
      const user = { role: 'owner', id: 1 };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2, storeId: 1 };

      const result = await service.updateStore(user, input);
      expect(result).toBeInstanceOf(Store);
    });

    it('가게 정보는 관리자와 점주만 수정할수 있다.', async () => {
      const user = { role: 'customer', id: 1 };
      const input = { name: 'test', address: 'test', startHour: 1, endHour: 2, storeId: 1 };
      expect(async () => {
        await service.updateStore(user, input);
      }).rejects.toThrowError(new PermissionError('권한이 없습니다.'));
    });

    it('수정하려는 address가 현재 address와 다르다면 findByAddress를 호출한다.', async () => {
      const user = { role: 'owner', id: 1 };
      const input = { name: 'test', address: 'test2', startHour: 1, endHour: 2, storeId: 1 };
      storeRepository.useValue.findByAddress.mockImplementation(async () => undefined);
      await service.updateStore(user, input);
      expect(storeRepository.useValue.findByAddress).toBeCalled();
    });
  });

  describe('가게 삭제', () => {
    beforeAll(() => {
      jest.clearAllMocks();
      storeRepository.useValue.findById.mockImplementation(async (id) => {
        const store = Store.of({ name: 'test', address: 'test', startHour: 1, endHour: 2 });
        return store;
      });
    });

    it('가게는 관리자와 점주만 삭제할수 있다.', async () => {
      const user = { role: 'customer', id: 1 };
      const storeId = 1;
      expect(async () => {
        await service.deleteStore(user, storeId);
      }).rejects.toThrowError(new PermissionError('권한이 없습니다.'));
    });

    it('가게를 삭제하면 가게의 상태가 Activate가 false로 변경된다.', async () => {
      const user = { role: 'owner', id: 1 };
      const storeId = 1;
      await service.deleteStore(user, storeId);
      expect(storeRepository.useValue.save).toBeCalled();
      expect(storeRepository.useValue.save.mock.calls[0][0]).toMatchObject({
        address: 'test',
        name: 'test',
        startHour: 1,
        endHour: 2,
        isActivated: false,
      });
    });
  });
});
