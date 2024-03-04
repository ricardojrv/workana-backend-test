import { Router } from 'express';
import authController from './authController';

const authRouter = Router();

authRouter.post('/signin', authController.signIn)
  .post('/login', authController.login)
  .post('/logout', authController.logout);

export default authRouter;
