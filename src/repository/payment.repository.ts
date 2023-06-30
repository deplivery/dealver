import { Payment } from '../entities/payment.entity';
import { CustomRepository } from '../shared/typeorm-ex.decorator';
import { FindManyOptions, getManager, In, Repository, SelectQueryBuilder } from 'typeorm';
import { Product } from '../entities/product.entity';

@CustomRepository({ entity: Payment })
export class PaymentRepository extends Repository<Payment> {
  async createPayment(payment: Payment): Promise<Payment> {
    const createdPayment = this.create(payment);
    return this.save(createdPayment);
  }

  async getPaymentById(id: number): Promise<Payment> {
    return this.findOne({ where: { id } });
  }

  async getPayments(storeManagerId?: number, userId?: number, productId?: number): Promise<Payment[]> {
    return [];
  }
}
