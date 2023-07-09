import { FindManyOptions, In, Repository } from 'typeorm';
import { Product, PRODUCT_STATUS } from '../../domain/entity/product.entity';
import { CustomRepository } from '../../../../shared/orm/typeorm-ex.decorator';

@CustomRepository({ entity: Product })
export class ProductRepository extends Repository<Product> {
  async createProduct(product: Product): Promise<Product> {
    const createdProduct = this.create(product);
    return this.save(createdProduct);
  }

  async getProductById(id: number): Promise<Product> {
    // TODO 이거 findOne 을 사용해도 되지만 하나만 찾는거면 findById 를 사용하는게 더 좋을 것 같습니다.
    // return this.findOneBy({ id });
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
    // service 단에서 await 하고 있다면 await 지워도 될것 같아영 !
    return await this.find({
      where: {
        id: In(productIds),
        status: PRODUCT_STATUS.AVAILABLE,
      },
    });
  }
}
