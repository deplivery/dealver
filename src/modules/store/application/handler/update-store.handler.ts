import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AutoInjectable } from '@tiny-nestjs/auto-injectable';

import { StoreDomain } from '../../domain/domain/store.domain';
import { StoreRepository } from '../../infra/db/repository/store.repository';
import { UpdateStoreCommand } from '../command/update-store.command';

@CommandHandler(UpdateStoreCommand)
@AutoInjectable()
export class UpdateStoreHandler implements ICommandHandler<UpdateStoreCommand> {
  constructor(private readonly repository: StoreRepository) {}

  async execute(command: UpdateStoreCommand): Promise<StoreDomain> {
    const store = await this.repository.findById(command.storeId);
    if (!store) throw new Error('상점이 존재하지 않습니다.');
    const changedStore = store.changeStoreInfo(command);
    return this.repository.saveStore(changedStore);
  }
}
