import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../infra/db/product.repository';
import { InputError } from '../../../shared/error/input.error';
import { CreateProductInput, Product, PRODUCT_STATUS } from '../domain/entity/product.entity';
import { ProductCount } from '../../payment/facade/user-payment.facade';

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

  async checkAvailableProducts(productCounts: ProductCount[]): Promise<boolean> {
    const productIds = productCounts.map((productCount) => productCount.productId);
    const availableProducts = await this.productRepository.getAvailableProductsByProductIds(productIds);
    const availableProductIds = availableProducts.map((availableProduct) => availableProduct.id);

    for (const productCount of productCounts) {
      const productId = productCount.productId;
      if (!availableProductIds.includes(productId)) {
        return false;
      }

      const count = productCount.count;
      const availableCount = availableProducts.find((product) => product.id === productId).count;
      if (availableCount < count) {
        return false;
      }
    }
    return true;
  }
}
