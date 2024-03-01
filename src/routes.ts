import express from 'express';
import  fabricRouter  from  './components/fabric/fabricRouter'
import  productRouter  from  './components/product/productRouter'

export const routes = express.Router();

routes.use('/api/v1/fabric', fabricRouter);
routes.use('/api/v1/product', productRouter);