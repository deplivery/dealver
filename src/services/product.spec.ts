import { Test } from '@nestjs/testing';
import { MockedValueProvider, mockProvider } from '../../test/util/mock';
import { OrderRepository } from '../repository/order.repository';
import { ProductService } from './product.service';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repository/product.repository';
import { InputError } from '../shared/error/input.error';

describe('product', () => {
  let productService: ProductService;
  let productRepository: MockedValueProvider<ProductRepository>;
  let orderRepository: MockedValueProvider<OrderRepository>;

  beforeAll(async () => {
    orderRepository = mockProvider(OrderRepository);
    productRepository = mockProvider(ProductRepository);
    const app = (
      await Test.createTestingModule({
        imports: [],
        providers: [ProductService, orderRepository, productRepository],
      }).compile()
    ).createNestApplication();
    await app.init();
    productService = app.get<ProductService>(ProductService);
  });

  describe('음식', () => {
    let product;
    beforeAll(() => {
      productRepository.useValue.getProductById.mockImplementation(async (id: number) => {
        if (id) {
          product = new Product();
          return product;
        }
        return undefined;
      });
    });

    it('유효하지 않은 id일 경우 throw new InputError', async () => {
      const productId = 0;
      await expect(async () => {
        await productService.getProduct(productId);
      }).rejects.toThrowError(new InputError('프로덕트가 없어요.'));
    });

    it('유효한 id일 경우 product 리턴', async () => {
      const result = await productService.getProduct(1);
      expect(result).toBe(product);
    });
  });
});
