import { Product } from '@prisma/client';
import prisma from '../../db/prisma';
import { BadRequestError, NotFoundError } from '../../library/error/apiErrors';
import parseBigInt from '../../library/helpers/parseJsonWithBigInt';
import validateProductData from '../../library/helpers/validateProductData';

export const findAllProductsByFabId = async (IdFab: string) => {
  if (!IdFab) throw new BadRequestError('Invalid fabric id');
  const products = await prisma.product.findMany({
    where: {
      fabricId: Number(IdFab),
    },
  });

  const parsedproducts = products.map(parseBigInt);

  return parsedproducts;
};

export const getProductById = async (id: string): Promise<Product> => {
  if (!id) throw new BadRequestError('Invalid product id');

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) throw new NotFoundError();


  return parseBigInt(product);
};

export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  const error = validateProductData(productData);
  if (error) throw new BadRequestError(error);
  const dbFabric = await prisma.fabric.findUnique({ where: { idFab: BigInt(productData.fabricId) } });
  if (!dbFabric) throw new BadRequestError('wrong fabric id');

  const product = await prisma.product.create({ data: { description: productData.description, price: productData.price, existency: productData.existency, fabricId: productData.fabricId } });

  return parseBigInt(product);
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  const error = validateProductData(productData);
  if (error) throw new BadRequestError(error);

  if (!id) throw new BadRequestError('Invalid product id');

  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      description: productData.description, price: productData.price, existency: productData.existency, fabricId: productData.fabricId,
    },
  });

  return parseBigInt(product);
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  if (!id) throw new BadRequestError('Invalid product id');

  const product = await prisma.product.findUnique({ where: { id: BigInt(id) } });

  if (!product) throw new NotFoundError('Invalid product id');
  await prisma.product.delete({
    where: {
      id: BigInt(id),
    },
  });

  return true;
};
