import { mapToDomain, mapToEntity } from '@shared/domain/mapper';

import { StoreConfirmEntity } from '../../infra/db/entity/store-confirm.entity';
import { StoreEntity } from '../../infra/db/entity/store.entity';
import { StoreDomain } from '../domain/store.domain';
import { StoreConfirm } from '../value/store-confirm';

export class StoreModelMapper {
  static toDomain(entity: StoreEntity): StoreDomain {
    return mapToDomain<StoreEntity, StoreDomain>(entity, StoreDomain);
  }

  static toEntity(domain: StoreDomain): StoreEntity {
    return mapToEntity<StoreDomain, StoreEntity>(domain, StoreEntity);
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
