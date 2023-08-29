import { ICommand } from '@nestjs/cqrs';

export class DeleteStoreCommand implements ICommand {
  constructor(readonly storeId: number) {}
}
