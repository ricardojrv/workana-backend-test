import validateProductData from './validateProductData';

describe('validateProductData', () => {
  it('should return null for valid product data', () => {
    const productData = { description: 'A valid product', price: 100, existency: 10n };
    expect(validateProductData(productData)).toBeNull();
  });

  it('should report missing description', () => {
    const productData = { price: 100, existency: 10n };
    expect(validateProductData(productData)).toMatch('Description is required');
  });

  it('should report a price of 0 or less', () => {
    const productData = { description: 'A valid product', price: 0, existency: 10n };
    expect(validateProductData(productData)).toMatch('Price must be greater than 0');
  });

  it('should report negative existency', () => {
    const productData = { description: 'A valid product', price: 100, existency: -1n };
    expect(validateProductData(productData)).toMatch('Existency must be non-negative');
  });
});
