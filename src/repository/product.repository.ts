import { Injectable } from '@nestjs/common';
import { Payment } from '../entities/payment.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductRepository {
  async createProduct(): Promise<Product> {
    return new Product();
  }

  async getProductById(id: number): Promise<Product> {
    return new Product();
  }

  async updateProduct(product: Product): Promise<Product> {
    return product;
  }
}
