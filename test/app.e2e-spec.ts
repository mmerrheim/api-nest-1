
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ProductController } from '../src/api/product/controllers/product.controller';
import { ProductService } from '../src/api/product/services/product.service';
import { Product } from '../src/database/entities/product.entity';
import { PaginationDto } from '../src/api/product/dto/pagination.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/');
    expect(response.status).toBe(200);
    expect(response.body.isSuccess).toBe(true);
    expect(response.body.errors).toStrictEqual([]);
  });
});


/*
describe('Test findAll route', () => {
  let app: INestApplication;

  beforeEach(async () => {
    let productService = { getAllProducts: () => ['test'] };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
    .overrideProvider(ProductService)
    .useValue(productService)
    .compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    const productService2 = moduleFixture.get<ProductService>(ProductService);
    productService2.getAllProducts = jest.fn().mockResolvedValueOnce([
      {
        id: 1,
        title: 'test',
        description: 'test',
        isActive: true,
        merchantId: 1,
        categoryId: 1,
      } as Product,
    ]);

  })

  it('should return an array of products', async () => {
    const response = await request(app.getHttpServer()).get('/product');
    expect(response.status).toBe(200);
    /*
    expect(response.body).toEqual([
      {
        id: 1,
        title: 'test',
        description: 'test',
        isActive: true,
        merchantId: 1,
        categoryId: 1,
      },
    ]);
    
  });
});
*/

