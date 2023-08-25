import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AutoInjectable } from '@tiny-nestjs/auto-injectable';

import { StoreDomain } from '../../domain/domain/store.domain';
import { StoreDomainService } from '../../domain/service/store.domain.service';
import { StoreRepository } from '../../infra/db/repository/store.repository';
import { CreateStoreCommand } from '../command/create-store.command';

@AutoInjectable()
@CommandHandler(CreateStoreCommand)
export class CreateStoreHandler implements ICommandHandler<CreateStoreCommand> {
  constructor(private readonly domainService: StoreDomainService, private readonly repository: StoreRepository) {}

  async execute(command: CreateStoreCommand): Promise<StoreDomain> {
    const store = StoreDomain.of({ ...command });
    await this.domainService.existStore(store, command.address);
    return this.repository.saveStore(store);
  }
}
