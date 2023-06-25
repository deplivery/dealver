import { CreateStoreInput } from 'src/services/store.service';

export class Store {
  name: string;
  address: string;
  startHour: number;
  endHour: number;
  isActivated: boolean;

  static of(input: CreateStoreInput): Store {
    const store = new Store();
    store.name = input.name;
    store.address = input.address;
    store.startHour = input.startHour;
    store.endHour = input.endHour;
    store.isActivated = false;
    return store;
  }
}
