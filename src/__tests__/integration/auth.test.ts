import request from 'supertest';
import app from '../../app';
import { user } from '../__mocks__/mocks';

describe('Authentication API', () => {

  it('should register a new user', async () => {

    const response = await request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201); // Assuming 201 for successful creation
  });

  it('should log in an existing user', async () => {

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200); // Assuming 200 for successful login
    expect(response.body).toHaveProperty('token'); // Assuming the response includes a token
  });

});