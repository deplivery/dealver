import { Test, TestingModule } from '@nestjs/testing';

import { MockedValueProvider, mockProvider } from '@test/util/mock';

import { StoreDomainService } from './store.domain.service';
import { StoreRepository } from '../../infra/db/repository/store.repository';
import { StoreDomain } from '../domain/store.domain';

describe('StoreDomainService', () => {
  let storeDomainService: StoreDomainService;
  let storeRepository: MockedValueProvider<StoreRepository>;

  beforeAll(async () => {
    storeRepository = mockProvider(StoreRepository);
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreDomainService, storeRepository],
    }).compile();
    storeDomainService = module.get<StoreDomainService>(StoreDomainService);
  });

  it('should be defined', () => {
    expect(storeDomainService).toBeDefined();
  });

  describe('existStore', () => {
    it('존재하는 주소와 exclude 주소가 다르면 오류가 발생하지 않는다.', async () => {
      const input = {
        name: 'name',
        address: 'address',
        startHour: 10,
        endHour: 20,
        storeManagerId: 1,
      };
      const store = StoreDomain.of(input);
      const existAddress = 'address';
      const result = await storeDomainService.existStore(store, existAddress);
      expect(result).toBe(undefined);
    });
  });
});
