import { InputError } from '../shared/error/input.error';

export interface CreateOrderDetailInput {
  orderId: number;
  productId: number;
  count: number;
}

export class OrderDetail {
  id: number;
  orderId: number;
  productId: number;
  count: number;

  static of(input: CreateOrderDetailInput) {
    if (input.orderId < 1 || input.productId < 1 || input.count < 1) {
      throw new InputError('잘못된 input');
    }
    const orderDetail = new OrderDetail();
    orderDetail.orderId = input.orderId;
    orderDetail.productId = input.productId;
    orderDetail.count = input.count;
    return orderDetail;
  }
}
