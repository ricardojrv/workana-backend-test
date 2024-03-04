import { Fabric } from '@prisma/client';
import prisma from '../../db/prisma';
import { BadRequestError } from '../../library/error/apiErrors';
import parseBigInt from '../../library/helpers/parseJsonWithBigInt';

const validateFabricData = (fabricData: Partial<Fabric>): string | null => {
  if (!fabricData.description || fabricData.description.trim().length === 0) {
    return 'Description is required';
  }
  if (!fabricData.name || fabricData.name.trim().length === 0) {
    return 'Name is required';
  }
  return null;
};

const findFabric = async () => {
  const fabrics = await prisma.fabric.findMany();
  return parseBigInt(fabrics);
};

const createFabric = async (fabricData: Partial<Fabric>) => {
  const error = validateFabricData(fabricData);

  if (error) throw new BadRequestError(error);

  const fabric = await prisma.fabric.create({ data: { name: fabricData.name, description: fabricData.description } });

  return parseBigInt(fabric);
};

const updateFabric = async (id: number, fabricData: Partial<Fabric>) => {
  if (!id) throw new BadRequestError('Missing Id');

  const error = validateFabricData(fabricData);
  if (error) throw new BadRequestError(error);

  const fabric = prisma.fabric.update({
    where: {
      idFab: id,
    },
    data: {
      name: fabricData.name,
      description: fabricData.description,
    },
  });

  return parseBigInt(fabric);

};

const deleteFabric = async (id: number) => {
  if (!id) throw new BadRequestError('Missing Id');

  return prisma.fabric.delete({
    where: {
      idFab: id,
    },
  });
};

export default {
  findFabric,
  createFabric,
  updateFabric,
  deleteFabric,
};