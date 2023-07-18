import { StoreConfirm } from '@module/store/domain/value/store-confirm';
import { StoreConfirmEntity, StoreState } from '@module/store/infra/db/entity/store-confirm.entity';

import { StoreConfirmModelMapper, StoreModelMapper } from './store-model.mapper';
import { StoreEntity } from '../../infra/db/entity/store.entity';
import { StoreDomain } from '../domain/store.domain';

describe('StoreModelMapper', () => {
  describe('StoreModelMapper toDomain', () => {
    it('should map StoreEntity to Store domain', () => {
      // 준비
      const entity: StoreEntity = {
        id: 1,
        name: 'store name',
        address: 'store address',
        startHour: 9,
        endHour: 18,
        isActivated: true,
        storeManagerId: 123,
        storeManager: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };

      const result = StoreModelMapper.toDomain(entity);

      expect(result).toBeInstanceOf(StoreDomain);
      expect(result.getId()).toBe(entity.id);
    });
  });

  describe('StoreModelMapper toEntity', () => {
    it('should map Store domain to StoreEntity', () => {
      // Prepare
      const domain: StoreDomain = new StoreDomain({
        name: 'store name',
        address: 'store address',
        startHour: 9,
        endHour: 18,
        isActivated: true,
        storeManagerId: 123,
      });

      const result = StoreModelMapper.toEntity(domain);

      expect(result).toBeInstanceOf(StoreEntity);
      expect(result.id).toBe(domain.getId());
      expect(result.name).toBe(domain.props.name);
      expect(result.address).toBe(domain.props.address);
      expect(result.startHour).toBe(domain.props.startHour);
      expect(result.endHour).toBe(domain.props.endHour);
      expect(result.isActivated).toBe(domain.props.isActivated);
      expect(result.storeManagerId).toBe(domain.props.storeManagerId);
    });
  });

  describe('StoreConfirmModelMapper toDomain', () => {
    it('should map StoreConfirmEntity to StoreConfirm domain', () => {
      const entity: StoreConfirmEntity = {
        id: 1,
        store: undefined,
        storeId: 123,
        reason: 'good reason',
        state: StoreState.Confirm,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const result = StoreConfirmModelMapper.toDomain(entity);
      expect(result).toBeInstanceOf(StoreConfirm);
      expect(result.getValues().storeId).toBe(entity.storeId);
      expect(result.getValues().reason).toBe(entity.reason);
      expect(result.getValues().state).toBe(entity.state);
    });
  });

  describe('StoreConfirmModelMapper toEntity', () => {
    it('should map StoreConfirm domain to StoreConfirmEntity', () => {
      const domain: StoreConfirm = new StoreConfirm({
        storeId: 123,
        reason: 'good reason',
        state: StoreState.Confirm,
      });

      const result = StoreConfirmModelMapper.toEntity(domain);

      expect(result).toBeInstanceOf(StoreConfirmEntity);
      expect(result.storeId).toBe(domain.getValues().storeId);
      expect(result.reason).toBe(domain.getValues().reason);
      expect(result.state).toBe(domain.getValues().state);
    });
  });
});
