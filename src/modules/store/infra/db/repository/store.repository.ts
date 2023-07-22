import { Repository } from 'typeorm';

import { CustomRepository } from '@/shared/orm/typeorm-ex.decorator';
import { mapToDomain, mapToEntity } from '@shared/domain/mapper';

import { StoreDomain } from '../../../domain/domain/store.domain';
import { StoreConfirmValue } from '../../../domain/value/store-confirm';
import { StoreConfirmEntity } from '../entity/store-confirm.entity';
import { StoreEntity } from '../entity/store.entity';

@CustomRepository({ entity: StoreEntity })
export class StoreRepository extends Repository<StoreEntity> {
  async findById(id: number): Promise<StoreDomain | undefined> {
    const entity = await this.findOne({ where: { id } });
    return entity ? mapToDomain(entity, StoreDomain) : undefined;
  }

  async findByAddress(address: string): Promise<StoreDomain | undefined> {
    const entity = await this.findOne({ where: { address } });
    return entity ? mapToDomain(entity, StoreDomain) : undefined;
  }

  async saveStore(store: StoreDomain): Promise<StoreDomain> {
    const entity = mapToEntity(store, StoreEntity);
    const savedEntity = await this.save(entity);
    return mapToDomain(savedEntity, StoreDomain);
  }

  async saveConfirm(confirm: StoreConfirmValue): Promise<StoreConfirmValue> {
    const entity = mapToEntity(confirm, StoreConfirmEntity);
    const savedEntity = await this.manager.getRepository(StoreConfirmEntity).save(entity);
    return mapToDomain(savedEntity, StoreConfirmValue);
  }
}
