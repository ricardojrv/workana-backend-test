import { Product } from '@prisma/client';

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

export default validateProductData;