import { Injectable } from '@nestjs/common';
import { OrderDetailRepository } from '../repository/order-detail.repository';
import { CreateOrderDetailInput, OrderDetail } from '../entities/order-detail.entity';

@Injectable()
export class OrderDetailService {
  constructor(private readonly orderDetailRepository: OrderDetailRepository) {}

  async createOrderDetail(input: CreateOrderDetailInput): Promise<OrderDetail> {
    return this.orderDetailRepository.createOrderDetail(OrderDetail.of(input));
  }

  async createOrderDetails(input: CreateOrderDetailInput[]): Promise<OrderDetail[]> {
    return Promise.all(input.map((orderDetail) => this.createOrderDetail(orderDetail)));
  }

  async getOrderDetails(orderId: number): Promise<OrderDetail[]> {
    return this.orderDetailRepository.getOrderDetailsByOrderId(orderId);
  }
}
