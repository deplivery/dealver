import { ICommand } from '@nestjs/cqrs';

export class UpdateStoreCommand implements ICommand {
  constructor(
    readonly storeId: number,
    readonly name?: string,
    readonly address?: string,
    readonly startHour?: number,
    readonly endHour?: number,
  ) {}
}
