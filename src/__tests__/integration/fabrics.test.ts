import request from 'supertest';
import app from '../../app';
import { fabric } from '../__mocks__/mocks';

describe('Fabrics API', () => {

  it('should create a new fabric', async () => {
    const response = await request(app)
      .post('/api/v1/fabric')
      .send({ name: fabric.name, description: fabric.description })
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
  });

  it('should fetch all fabrics', async () => {
    const response = await request(app).get('/api/v1/fabric');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
