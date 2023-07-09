import { Repository } from 'typeorm';
import { CustomRepository } from '@/shared/orm/typeorm-ex.decorator';

import { Store } from '../../../domain/entity/store';
import { StoreEntity } from '../entity/store.entity';
import { StoreConfirmModelMapper, StoreModelMapper } from '../../../domain/mapper/store-model.mapper';
import { StoreConfirm } from '../../../domain/value/store-confirm';
import { StoreConfirmEntity } from '../entity/store-confirm.entity';

@CustomRepository({ entity: StoreEntity })
export class StoreRepository extends Repository<StoreEntity> {
  async findById(id: number): Promise<Store | undefined> {
    const entity = await this.findOne({ where: { id } });
    return entity ? StoreModelMapper.toDomain(entity) : undefined;
  }

  async findByAddress(address: string): Promise<Store | undefined> {
    const entity = await this.findOne({ where: { address } });
    return entity ? StoreModelMapper.toDomain(entity) : undefined;
  }

  async saveStore(store: Store): Promise<Store> {
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
