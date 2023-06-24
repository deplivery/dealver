import { Injectable } from '@nestjs/common';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentRepository {
  async createPayment(): Promise<Payment> {
    return new Payment();
  }

  async getPayment(): Promise<Payment> {
    return new Payment();
  }

  async updatePayment(payment: Payment): Promise<Payment> {
    return payment;
  }
}
