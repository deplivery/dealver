export enum PRODUCT_STATUS {
  AVAILABLE = 'Available',
  UNAVAILABLE = 'Unavailable',
}

export class Product {
  name: string;
  status: PRODUCT_STATUS;
  count: number;
}
