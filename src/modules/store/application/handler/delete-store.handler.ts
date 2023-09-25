import { InjectQueue } from '@nestjs/bull';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AutoInjectable } from '@tiny-nestjs/auto-injectable';
import { Queue } from 'bull';

import { InputError } from '@shared/error/input.error';

import { StoreDomain } from '../../domain/domain/store.domain';
import { StoreRepository } from '../../infra/db/repository/store.repository';
import { DeleteStoreCommand } from '../command/delete-store.command';

@CommandHandler(DeleteStoreCommand)
@AutoInjectable()
export class DeleteStoreHandler implements ICommandHandler<DeleteStoreCommand> {
  constructor(@InjectQueue('store') private readonly publisher: Queue, private readonly repository: StoreRepository) {}

  async execute(command: DeleteStoreCommand): Promise<StoreDomain> {
    const store = await this.repository.findById(command.storeId);
    if (!store) {
      throw new InputError('존재하지 않는 가게입니다.');
    }
    this.publisher.add('close', { ...store });
    const deletedStore = store.changeActivated(false);
    return this.repository.saveStore(deletedStore);
  }
}
