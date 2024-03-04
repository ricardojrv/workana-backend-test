import express from 'express';
import fabricRouter from './components/fabric/fabricRouter';
import productRouter from './components/product/productRouter';
import authRouter from './components/auth/authRouter';



export const routes = express.Router();

routes.use('/api/v1/auth', authRouter);
routes.use('/api/v1/fabric', fabricRouter);
routes.use('/api/v1/product', productRouter);