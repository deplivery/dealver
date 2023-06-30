import { Injectable } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { OrderService } from '../services/order.service';
import { OrderDetailService } from '../services/order-detail.service';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { CacheService } from '../interface/cache.interface';

@Injectable()
export class StoreOrderFacade {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService,
    private readonly orderDetailService: OrderDetailService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly cacheService: CacheService,
  ) {}

  approve;
}
