import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Product, PRODUCT_STATUS } from '../entities/product.entity';
import { InputError } from '../shared/error/input.error';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(product: Product): Promise<Product> {
    const createdProduct = this.productRepository.create(product);
    return this.productRepository.save(createdProduct);
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async getProducts(storeManagerId: number, status?: PRODUCT_STATUS): Promise<Product[]> {
    if (!storeManagerId) {
      throw new InputError('storeManagerId가 필요합니다.');
    }

    const query: FindManyOptions<Product> = {
      where: {
        storeManagerId,
        ...(status && { status }),
      },
    };

    return this.productRepository.find(query);
  }
}
