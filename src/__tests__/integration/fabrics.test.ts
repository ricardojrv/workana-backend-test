import request from 'supertest';
import app from '../../app'; // Adjust this import path to where your Express app is defined

describe('Fabrics API', () => {
  it('should create a new fabric', async () => {
    const response = await request(app)
      .post('/fabrics')
      .send({
        name: 'Test Fabric',
        description: 'A test fabric',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('idFab');
  });

  it('should fetch all fabrics', async () => {
    const response = await request(app).get('/fabrics');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
