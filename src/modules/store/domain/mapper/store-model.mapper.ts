import { mapToDomain, mapToEntity } from '@shared/domain/mapper';

import { StoreConfirmEntity } from '../../infra/db/entity/store-confirm.entity';
import { StoreEntity } from '../../infra/db/entity/store.entity';
import { Store } from '../entity/store';
import { StoreConfirm } from '../value/store-confirm';

export class StoreModelMapper {
  static toDomain(entity: StoreEntity): Store {
    return mapToDomain<StoreEntity, Store>(entity, Store);
  }

  static toEntity(domain: Store): StoreEntity {
    return mapToEntity<Store, StoreEntity>(domain, StoreEntity);
  }
}

export class StoreConfirmModelMapper {
  static toDomain(entity: StoreConfirmEntity): StoreConfirm {
    return mapToDomain<StoreConfirmEntity, StoreConfirm>(entity, StoreConfirm);
  }

  static toEntity(domain: StoreConfirm): StoreConfirmEntity {
    return mapToEntity<StoreConfirm, StoreConfirmEntity>(domain, StoreConfirmEntity);
  }
}
