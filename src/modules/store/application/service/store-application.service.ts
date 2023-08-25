import { CommandBus } from '@nestjs/cqrs';
import { AutoInjectable } from '@tiny-nestjs/auto-injectable';

import { CreateStoreCommand } from '../command/create-store.command';

@AutoInjectable()
export class StoreApplicationService {
  constructor(private commandBus: CommandBus) {}

  createStore(command: CreateStoreCommand) {
    return this.commandBus.execute(command);
  }
}
