import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { InputError } from '../shared/error/input.error';
import { Product, PRODUCT_STATUS } from '../entities/product.entity';

export interface CreateProductInput {
  storeManagerId: number;
  name: string;
  price: number;
  status: PRODUCT_STATUS;
  count: number;
}

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(input: CreateProductInput) {
    return await this.productRepository.createProduct(Product.of(input));
  }

  async getProduct(id: number) {
    if (id < 1) {
      throw new InputError('잘못된 input');
    }
    return await this.productRepository.getProductById(id);
  }

  async getProducts(storeManagerId: number, status?: PRODUCT_STATUS) {
    if (storeManagerId < 1) {
      throw new InputError('storeManagerId가 필요합니다.');
    }
    return await this.productRepository.getProducts(storeManagerId, status);
  }
}
