import request from 'supertest';
import app from '../../app';

describe('Products API', () => {
  it('should create a new product', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        name: 'Test Product',
        price: 100,
        description: 'A test product',
        fabricId: 1,
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should fetch all products', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
