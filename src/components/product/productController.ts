import { Request, Response, NextFunction } from 'express';
import * as ProductService from './productService'; // Adjust the import path as necessary

export const getAllProductsByFabId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fabId } = req.params;
    const products = await ProductService.findAllProductsByFabId(fabId);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const product = await ProductService.getProductById(productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedProduct = await ProductService.updateProduct(id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await ProductService.deleteProduct(id);

    res.status(204).send({ message: 'product deleted' });
  } catch (error) {
    next(error);
  }
};
