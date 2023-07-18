import { Repository } from 'typeorm';

import { CustomRepository } from '@/shared/orm/typeorm-ex.decorator';

import { StoreDomain } from '../../../domain/domain/store.domain';
import { StoreConfirmModelMapper, StoreModelMapper } from '../../../domain/mapper/store-model.mapper';
import { StoreConfirm } from '../../../domain/value/store-confirm';
import { StoreConfirmEntity } from '../entity/store-confirm.entity';
import { StoreEntity } from '../entity/store.entity';

@CustomRepository({ entity: StoreEntity })
export class StoreRepository extends Repository<StoreEntity> {
  async findById(id: number): Promise<StoreDomain | undefined> {
    const entity = await this.findOne({ where: { id } });
    return entity ? StoreModelMapper.toDomain(entity) : undefined;
  }

  async findByAddress(address: string): Promise<StoreDomain | undefined> {
    const entity = await this.findOne({ where: { address } });
    return entity ? StoreModelMapper.toDomain(entity) : undefined;
  }

  async saveStore(store: StoreDomain): Promise<StoreDomain> {
    const entity = StoreModelMapper.toEntity(store);
    const savedEntity = await this.save(entity);
    return StoreModelMapper.toDomain(savedEntity);
  }

  async saveConfirm(confirm: StoreConfirm): Promise<StoreConfirm> {
    const entity = StoreConfirmModelMapper.toEntity(confirm);
    const savedEntity = await this.manager.getRepository(StoreConfirmEntity).save(entity);
    return StoreConfirmModelMapper.toDomain(savedEntity);
  }
}
