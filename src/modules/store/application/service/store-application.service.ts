import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AutoInjectable } from '@tiny-nestjs/auto-injectable';

import { CreateStoreCommand } from '../command/create-store.command';
import { DeleteStoreCommand } from '../command/delete-store.command';
import { UpdateStoreCommand } from '../command/update-store.command';
import { FindStoreQuery } from '../query/find-store.query';

@AutoInjectable()
export class StoreApplicationService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  createStore(command: CreateStoreCommand) {
    return this.commandBus.execute(command);
  }
  updateStore(command: UpdateStoreCommand) {
    return this.commandBus.execute(command);
  }
  deleteStore(command: DeleteStoreCommand) {
    return this.commandBus.execute(command);
  }
  getStoreById(query: FindStoreQuery) {
    return this.queryBus.execute(query);
  }
}
