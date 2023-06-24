import { Test } from '@nestjs/testing';
import { MockedValueProvider, mockProvider } from '../../test/util/mock';
import { OrderRepository } from '../repository/order.repository';
import { CreateProductInput, ProductService } from './product.service';
import { Product, PRODUCT_STATUS } from '../entities/product.entity';
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

  describe('createProduct()', () => {
    let product;
    beforeAll(() => {
      productRepository.useValue.createProduct.mockImplementation(async (input: CreateProductInput) => {
        product = new Product(input.storeManagerId, input.name, input.price, input.status, input.count);
        return product;
      });
    });

    it('유효한 input일 때 product 리턴', async () => {
      const input = {
        storeManagerId: 1,
        name: 'hello2',
        price: 1000,
        status: PRODUCT_STATUS.AVAILABLE,
        count: 10,
      };

      const result = await productService.createProduct(input);

      expect(result).toBe(product);
    });

    it('유효하지 않은 input일 때 InputError 던짐', async () => {
      const input = {
        storeManagerId: 0,
        name: '',
        price: -100,
        status: PRODUCT_STATUS.AVAILABLE,
        count: -10,
      };

      await expect(productService.createProduct(input)).rejects.toThrow(InputError);
    });
  });

  describe('getProduct()', () => {
    const product = new Product(1, 'hello', 1000, PRODUCT_STATUS.AVAILABLE, 10);

    beforeAll(() => {
      productRepository.useValue.getProductById.mockImplementation(async (id: number) => product);
    });

    it('유효하지 않은 id일 경우 throw new InputError', async () => {
      const productId = 0;
      await expect(async () => {
        await productService.getProduct(productId);
      }).rejects.toThrowError(new InputError('잘못된 input'));
    });

    it('유효한 id일 경우 product 리턴', async () => {
      const result = await productService.getProduct(1);
      expect(result).toBe(product);
    });
  });

  describe('getProducts()', () => {
    const availableProduct = new Product(1, 'available', 1000, PRODUCT_STATUS.AVAILABLE, 10);
    const unavailableProduct = new Product(1, 'unavailable', 1000, PRODUCT_STATUS.UNAVAILABLE, 10);
    beforeAll(() => {
      productRepository.useValue.getProducts.mockImplementation(
        async (storeManagerId: number, status?: PRODUCT_STATUS) => {
          if (storeManagerId < 1) {
            throw new InputError('storeManagerId가 필요합니다.');
          }
          if (!status) {
            return [availableProduct, unavailableProduct];
          }
          if (PRODUCT_STATUS.AVAILABLE == status) {
            return [availableProduct];
          }
          if (PRODUCT_STATUS.UNAVAILABLE == status) {
            return [unavailableProduct];
          }
          return [];
        },
      );
    });

    it('유효하지 않은 storeManagerId일 경우 throw new InputError', async () => {
      const storeManagerId = 0;
      await expect(async () => {
        await productService.getProducts(storeManagerId);
      }).rejects.toThrowError(new InputError('storeManagerId가 필요합니다.'));
    });

    it('status가 PRODUCT_STATUS.AVAILABLE일 때', async () => {
      const storeManagerId = 1;
      const status = PRODUCT_STATUS.AVAILABLE;
      const result = await productService.getProducts(storeManagerId, status);
      expect(result).toEqual([availableProduct]);
    });

    it('status가 PRODUCT_STATUS.UNAVAILABLE일 때', async () => {
      const storeManagerId = 1;
      const status = PRODUCT_STATUS.UNAVAILABLE;
      const result = await productService.getProducts(storeManagerId, status);
      expect(result).toEqual([unavailableProduct]);
    });

    it('status가 undefined일 때', async () => {
      const storeManagerId = 1;
      const result = await productService.getProducts(storeManagerId);
      expect(result).toHaveLength(2);
    });

    it('status가 undefined일 때', async () => {
      const storeManagerId = 1;
      const result = await productService.getProducts(storeManagerId);
      expect(result).toHaveLength(2);
    });
  });
});
