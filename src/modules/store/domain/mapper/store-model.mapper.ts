import { StoreConfirmEntity } from '../../infra/db/entity/store-confirm.entity';
import { StoreEntity } from '../../infra/db/entity/store.entity';
import { Store } from '../entity/store';
import { StoreConfirm } from '../value/store-confirm';

export class StoreModelMapper {
  static toDomain(entity: StoreEntity): Store {
    return new Store(
      {
        name: entity.name,
        address: entity.address,
        startHour: entity.startHour,
        endHour: entity.endHour,
        isActivated: entity.isActivated,
        storeManagerId: entity.storeManagerId,
      },
      entity.id,
    );
  }

  static toEntity(domain: Store): StoreEntity {
    const { props } = domain;
    const entity = new StoreEntity();
    return Object.assign(entity, props);
  }
}

export class StoreConfirmModelMapper {
  static toDomain(entity: StoreConfirmEntity): StoreConfirm {
    return new StoreConfirm({
      reason: entity.reason,
      storeId: entity.storeId,
      state: entity.state,
    });
  }

  static toEntity(domain: StoreConfirm): StoreConfirmEntity {
    const values = domain.getValues();
    const entity = new StoreConfirmEntity();
    return Object.assign(entity, values);
  }
}
