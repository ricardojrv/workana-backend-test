import { Fabric, Product } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const fabric: Partial<Fabric> = {
  idFab: BigInt(1),
  name: 'fabric',
  description: 'decription',
};

export const products = (fabricId: bigint): Partial<Product>[] => [
  {
    price: faker.number.float(),
    description: faker.commerce.product(),
    fabricId,
    existency: faker.number.bigInt(),
  },
  {
    price: faker.number.float(),
    description: faker.commerce.product(),
    fabricId,
    existency: faker.number.bigInt(),
  },
  {
    price: faker.number.float(),
    description: faker.commerce.product(),
    fabricId,
    existency: faker.number.bigInt(),
  },
];

export const user = {
  password: 'Passsword90@',
  email: faker.internet.email(),
};
