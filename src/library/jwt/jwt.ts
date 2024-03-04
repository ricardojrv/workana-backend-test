/* eslint-disable security/detect-object-injection */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from '../error/apiErrors';
import Redis from '../redis/redis';
import { promisify } from 'util';

const verifyAsync = promisify(jwt.verify.bind(jwt));

const decodeJwtAsync = async (token: string): Promise<jwt.JwtPayload> => {
  try {
    const decoded: JwtPayload = await verifyAsync(token, process.env.SECRET);

    return decoded;
  } catch (error) {
    throw new UnauthorizedError(error.message);
  }
};

const generateToken = ({ userId }: JwtPayload): string => {
  const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: '1d' });
  return token;
};

const blacklistToken = async (userId: string, token: string, tokenExp: number) => {
  try {
    const data = await Redis.get(userId);

    if (data !== null) {
      const parsedData = JSON.parse(data);
      parsedData[userId].push(token);

      await Redis.setex(userId, tokenExp, JSON.stringify(parsedData));
    } else {
      const blacklistData = {
        [userId]: [token],
      };
      await Redis.setex(userId, tokenExp, JSON.stringify(blacklistData));
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { decodeJwtAsync, generateToken, blacklistToken };