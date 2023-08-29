import { InjectQueue } from '@nestjs/bull';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AutoInjectable } from '@tiny-nestjs/auto-injectable';
import { Queue } from 'bull';

import { StoreDomain } from '../../domain/domain/store.domain';
import { StoreDomainService } from '../../domain/service/store.domain.service';
import { StoreRepository } from '../../infra/db/repository/store.repository';
import { CreateStoreCommand } from '../command/create-store.command';

@CommandHandler(CreateStoreCommand)
@AutoInjectable()
export class CreateStoreHandler implements ICommandHandler<CreateStoreCommand> {
  constructor(
    @InjectQueue('store') private readonly publisher: Queue,
    private readonly domainService: StoreDomainService,
    private readonly repository: StoreRepository,
  ) {}

  async execute(command: CreateStoreCommand): Promise<StoreDomain> {
    const store = StoreDomain.of({ ...command });
    await this.domainService.existStore(store, command.address);
    const newStore = await this.repository.saveStore(store);
    this.publisher.add('open', { ...newStore });
    return newStore;
  }
}
