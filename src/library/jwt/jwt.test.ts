import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../error/apiErrors';
import jwtUtils from './jwt';

jest.mock('jsonwebtoken');
jest.mock('../redis/redis');

describe('JWT utilities', () => {
  describe('decodeJwtAsync', () => {
    const mockToken = 'mockToken';
    const mockSecret = 'mockSecret';
    const mockPayload = { userId: '123', iat: 12345678, exp: 123456789 };

    beforeAll(() => {
      process.env.SECRET = mockSecret;
    });

    it('should decode a valid token', async () => {
      (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => callback(null, mockPayload));
      await expect(jwtUtils.decodeJwtAsync(mockToken)).resolves.toEqual(mockPayload);
    });

    it('should throw UnauthorizedError for an invalid token', async () => {
      (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => callback(new Error('invalid token'), null));
      await expect(jwtUtils.decodeJwtAsync(mockToken)).rejects.toThrow(UnauthorizedError);
    });
  });

});
