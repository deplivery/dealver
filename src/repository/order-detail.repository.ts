import { Injectable } from '@nestjs/common';
import { OrderDetail } from '../entities/order-detail.entity';

@Injectable()
export class OrderDetailRepository {
  async createOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail> {
    return new OrderDetail();
  }

  async getOrderDetailsByOrderId(orderId: number): Promise<OrderDetail[]> {
    return [];
  }
}
