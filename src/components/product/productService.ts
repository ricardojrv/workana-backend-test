import { Product } from './productModel';
import { AppDataSource } from '../../db/dataSource';
import { BadRequestError } from '../../library/error/apiErrors';

const productRepository = AppDataSource.getRepository(Product);


const validateProductData = (productData: Partial<Product>): string | null => {
  if (!productData.description || productData.description.trim().length === 0) {
    return 'Description is required';
  }
  if (productData.price <= 0) {
    return 'Price must be greater than 0';
  }
  if (productData.existency < 0) {
    return 'Existency must be non-negative';
  }
  return null;
};

export const findAllProducts = async () => {
  return await productRepository.find({ relations: ['fabric'] });
};

export const createProduct = async (productData: Partial<Product>) => {
  const error = validateProductData(productData);
  if (error) throw new BadRequestError(error);

  const product = productRepository.create(productData);
  return await productRepository.save(product);
};

export const updateProduct = async (id: string, productData: Partial<Product>) => {
  const error = validateProductData(productData);
  if (error) throw new BadRequestError(error);

  await productRepository.update(id, productData);
  if(!id) throw new BadRequestError('Invalid product id');

  return await productRepository.findOneBy({ Id: BigInt(id)});
};

export const deleteProduct = async (id: string) => {
  if(!id) throw new BadRequestError('Invalid product id');

  return await productRepository.delete(id);
};
