import { InputError } from '@shared/error/input.error';

export enum PAYMENT_TYPE {
  KAKAO = 'Kakao',
  CASH = 'Cash',
}

export interface CreatePaymentInput {
  userId: number;
  productId: number;
  type: PAYMENT_TYPE;
}

export class Payment {
  id: number;
  userId: number;
  productId: number;
  type: PAYMENT_TYPE;

  static of(input: CreatePaymentInput) {
    if (!input.userId || !input.productId || !input.type) {
      throw new InputError('잘못된 input');
    }
    const payment = new Payment();
    payment.userId = input.userId;
    payment.productId = input.productId;
    payment.type = input.type;
    return payment;
  }
}
