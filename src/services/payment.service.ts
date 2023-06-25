import { Injectable } from '@nestjs/common';
import { Payment } from '../entities/payment.entity';
import { PaymentRepository } from '../repository/payment.repository';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async createPayment(payment: Payment): Promise<Payment> {
    return this.paymentRepository.createPayment(payment);
  }

  async getPaymentById(id: number): Promise<Payment> {
    return this.paymentRepository.getPaymentById(id);
  }

  async getPayments(userId?: number, productId?: number): Promise<Payment[]> {
    return this.paymentRepository.getPayments(userId, productId);
  }
}
