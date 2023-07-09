import { InputError } from '../../../../shared/error/input.error';

export enum PRODUCT_STATUS {
  AVAILABLE = 'Available',
  UNAVAILABLE = 'Unavailable',
}

export interface CreateProductInput {
  storeManagerId: number;
  name: string;
  price: number;
  status: PRODUCT_STATUS;
  count: number;
}

export class Product {
  id: number;
  storeManagerId: number;
  name: string;
  price: number;
  status: PRODUCT_STATUS;
  count: number;

  static of(input: CreateProductInput) {
    if (input.storeManagerId < 1 || !input.name || input.price < 0 || !input.status || input.count < 0) {
      throw new InputError('잘못된 input');
    }
    const product = new Product();
    product.storeManagerId = input.storeManagerId;
    product.name = input.name;
    product.price = input.price;
    product.status = input.status;
    product.count = input.count;
    return product;
  }

  changeName(name: string) {
    if (!name) {
      throw new InputError('name이 유효하지 않습니다.');
    }
    this.name = name;
  }

  changePrice(price: number) {
    if (price < 0) {
      throw new InputError('price는 0보다 작을 수 없습니다.');
    }
    this.price = price;
  }

  changeStatus(status: PRODUCT_STATUS) {
    if (this.status === status) {
      return;
    }
    this.status = status;
  }

  changeCount(count: number) {
    if (count < 0) {
      throw new InputError('count는 0보다 작을 수 없습니다.');
    }
    this.count = count;
  }
}
