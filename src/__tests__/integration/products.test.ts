import request from 'supertest';
import app from '../../app';
import { fabric, products } from '../__mocks__/mocks';
import { Product } from '@prisma/client';
import parseBigInt from '../../library/helpers/parseJsonWithBigInt';

let FABRIC_ID: number;
let PRODUCST_ARRAY: Partial<Product>[];

beforeAll(async () => {
  const response = await request(app)
    .post('/api/v1/fabric')
    .send({ name: fabric.name, description: fabric.description })
    .set('Accept', 'application/json');

  FABRIC_ID = response.body.idFab;
  PRODUCST_ARRAY = products(BigInt(FABRIC_ID));

});

beforeAll(async () => {
  const response = await request(app)
    .post('/api/v1/fabric')
    .send({ name: fabric.name, description: fabric.description })
    .set('Accept', 'application/json');

  FABRIC_ID = response.body.idFab;
  PRODUCST_ARRAY = products(BigInt(FABRIC_ID));

});

describe('Products API', () => {
  it('should create a new product', async () => {
    const response = await request(app)
      .post('/api/v1/product')
      .send(parseBigInt(PRODUCST_ARRAY[0]));
    expect(response.statusCode).toBe(201);

  });

  it('should update a product', async () => {
    const response = await request(app)
      .post('/api/v1/product')
      .send(parseBigInt(PRODUCST_ARRAY[1]));

    const updateResponse = await request(app)
      .put(`/api/v1/product/${response.body.id}`)
      .send({ description: 'updated description' });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.description).not.toBe(response.body.description);
  });

  it('should delete a product', async () => {
    const response = await request(app)
      .post('/api/v1/product')
      .send(parseBigInt(PRODUCST_ARRAY[0]));

    const productId = response.body.id;

    const deleteResponse = await request(app)
      .delete(`/api/v1/product/${productId}`);

    expect(deleteResponse.statusCode).toBe(204);

  });

  it('should fetch all products', async () => {
    await Promise.all(PRODUCST_ARRAY.map(item => request(app).post('/api/v1/product').send(parseBigInt(item))));

    const response = await request(app).get(`/api/v1/product/fabric/${FABRIC_ID}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
