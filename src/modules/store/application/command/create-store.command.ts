import { ICommand } from '@nestjs/cqrs';

export class CreateStoreCommand implements ICommand {
  constructor(
    readonly name: string,
    readonly address: string,
    readonly startHour: number,
    readonly endHour: number,
    readonly storeManagerId: number,
  ) {}
}
