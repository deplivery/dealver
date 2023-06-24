import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { InputError } from '../shared/error/input.error';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProduct(id: number) {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new InputError('프로덕트가 없어요.');
    }
    return product;
  }
}
