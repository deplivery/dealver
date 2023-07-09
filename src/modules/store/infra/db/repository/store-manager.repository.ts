import { Repository } from 'typeorm';
import { CustomRepository } from '@/shared/orm/typeorm-ex.decorator';
import { StoreManagerEntity } from '../entity/store-manager.entity';

@CustomRepository({ entity: StoreManagerEntity })
export class StoreManagerRepository extends Repository<StoreManagerEntity> {
  async findById(id: number): Promise<StoreManagerEntity | undefined> {
    return this.findOne({ where: { id } });
  }
}
