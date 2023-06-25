import { InputError } from '../shared/error/input.error';

export enum ORDER_STATUS {
  PAID = 'Paid', // 주문의 초기 상태. 결제 완료 직후.
  PENDING = 'Pending', // 사장님의 승인을 기다리는 상태.
  PROCESSING = 'Processing', // 사장님의 승인 완료 후, 음식을 준비하는 상태.
  SHIPPED = 'Shipped', // 음식 준비가 완료되고 배달중인 상태.
  DELIVERED = 'Delivered', // 배달 완료.
  CANCELED = 'Canceled', // 취소
  REFUNDED = 'Refunded', // 환불
}

export interface CreateOrderInput {
  userId: number;
  status: ORDER_STATUS;
}

export class Order {
  id: number;
  userId: number;
  status: ORDER_STATUS;

  static of(input: CreateOrderInput) {
    if (input.userId < 1 || !input.status) {
      throw new InputError('잘못된 input');
    }
    const order = new Order();
    order.userId = input.userId;
    order.status = input.status;
    return order;
  }
}
