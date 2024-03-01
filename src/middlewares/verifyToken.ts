import { NextFunction, Request, Response } from "express";
import jwt from "../library/jwt/jwt";
import { ForbiddenError } from "../library/error/apiErrors";
import { PUBLIC_ROUTES } from "../config/consts";
import Redis from "../db/redis";

const verifyToken = async (request: Request, response: Response, next: NextFunction) => {
  if (PUBLIC_ROUTES.includes(request.path)) {
    return next();
  }

  const token = request.header('Authorization').replace('Bearer ', '');
  if (!token) {
    throw new ForbiddenError('No token provided! Please Login first')
  }

  const decoded = await jwt.decodeJwtAsync(token)

  const tokenData = await Redis.getAsync(decoded.id)

  if (tokenData !== null) {
    const parsedData = JSON.parse(tokenData);
    if (parsedData[decoded.id].includes(token)) {
      return response.status(401).send({
        message: 'You have to login!',
      });
    }
    return next();
  }


  request.userId = decoded?.id;
  request.tokenExp = decoded?.exp;
  request.token = token;

  next();
};

export default verifyToken