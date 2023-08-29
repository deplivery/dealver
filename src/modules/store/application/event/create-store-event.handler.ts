import { Processor, Process } from '@nestjs/bull';
import { AutoInjectable } from '@tiny-nestjs/auto-injectable';
import { Job } from 'bull';

import { StoreConfirmValue } from '../../domain/value/store-confirm';
import { StoreState } from '../../infra/db/entity/store-confirm.entity';
import { StoreEntity } from '../../infra/db/entity/store.entity';
import { StoreRepository } from '../../infra/db/repository/store.repository';

@Processor('store')
@AutoInjectable()
export class AudioConsumer {
  constructor(private readonly repository: StoreRepository) {}
  @Process('open')
  async open(job: Job<{ id: number; props: StoreEntity }>) {
    const newStore = job.data;
    const confirm = new StoreConfirmValue({
      state: StoreState.Ready,
      reason: '',
      storeId: newStore.id,
    });
    await this.repository.saveConfirm(confirm);
    return {};
  }
}
