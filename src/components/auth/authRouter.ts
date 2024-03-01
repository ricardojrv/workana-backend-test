import { Router } from "express";
import authController from './authController'

const authRouter = Router();

authRouter.post('/signin', authController.signIn);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

export default authRouter;
