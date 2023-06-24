import { CoreEntity } from '../shared/core.entity';
import { Column, Entity } from 'typeorm';

export enum PRODUCT_STATUS {
  AVAILABLE = 'Available',
  UNAVAILABLE = 'Unavailable',
}

@Entity()
export class Product extends CoreEntity {
  @Column()
  storeManagerId: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  status: PRODUCT_STATUS;
  @Column()
  count: number;

  constructor(storeManagerId: number, name: string, price: number, status: PRODUCT_STATUS, count: number) {
    super();
    this.storeManagerId = storeManagerId;
    this.name = name;
    this.price = price;
    this.status = status;
    this.count = count;
  }
}
