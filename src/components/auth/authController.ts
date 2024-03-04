import { NextFunction, Request, Response } from 'express';
import authService from './authService';

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await authService.signIn(email, password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await authService.login(email, password);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, token, tokenExp } = req;

    await authService.logout({ userId, token, tokenExp });
    res.send('Logged out successfully');
  } catch (error) {
    next(error);
  }
};

export default { signIn, login, logout };
