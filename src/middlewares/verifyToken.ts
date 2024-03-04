import { NextFunction, Request, Response } from 'express';
import jwt from '../library/jwt/jwt';
import { PUBLIC_ROUTES } from '../config/consts';
import Redis from '../library/redis/redis';



const verifyToken = async (request: Request, response: Response, next: NextFunction) => {
  try {
    if (PUBLIC_ROUTES.includes(request.path) || process.env.NODE_ENV === 'test') {
      return next();
    }

    const token = request?.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return response.status(401).send('No token provided! Please Login first');
    }

    const decoded = await jwt.decodeJwtAsync(token);

    const tokenData = await Redis.get(String(decoded.userId));

    if (tokenData !== null) {
      const parsedData = JSON.parse(tokenData);
      if (parsedData[decoded.userId].includes(token)) {
        return response.status(401).send({
          message: 'You have to login!',
        });
      }
      return next();
    }


    request.userId = decoded?.userId;
    request.tokenExp = decoded?.exp;
    request.token = token;

    next();
  } catch (error) {
    next(error);
  }

};

export default verifyToken;