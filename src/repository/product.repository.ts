import { FindManyOptions, In, Repository } from 'typeorm';
import { Product, PRODUCT_STATUS } from '../entities/product.entity';
import { CustomRepository } from '../shared/typeorm-ex.decorator';

@CustomRepository({ entity: Product })
export class ProductRepository extends Repository<Product> {
  async createProduct(product: Product): Promise<Product> {
    const createdProduct = this.create(product);
    return this.save(createdProduct);
  }

  async getProductById(id: number): Promise<Product> {
    return this.findOne({ where: { id } });
  }

  async getProducts(storeManagerId: number, status?: PRODUCT_STATUS): Promise<Product[]> {
    const query: FindManyOptions<Product> = {
      where: {
        storeManagerId,
        ...(status && { status }),
      },
    };

    return this.find(query);
  }

  async getAvailableProductsByProductIds(productIds: number[]): Promise<Product[]> {
    return await this.find({
      where: {
        id: In(productIds),
        status: PRODUCT_STATUS.AVAILABLE,
      },
    });
  }
}