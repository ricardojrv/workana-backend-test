import { Fabric } from './fabricModel';
import { AppDataSource } from '../../db/dataSource';
import { BadRequestError } from '../../library/error/apiErrors';

const fabricRepository = AppDataSource.getRepository(Fabric);

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
  return await fabricRepository.find();
};

const createFabric = async (fabricData: Partial<Fabric>) => {
  const error = validateFabricData(fabricData);

  if (error) throw new BadRequestError(error);

  const fabric = fabricRepository.create(fabricData);

  return await fabricRepository.save(fabric);
};

const updateFabric = async (id: number, fabricData: Partial<Fabric>) => {
  if (!id) throw new BadRequestError("Missing Id");

  const error = validateFabricData(fabricData);
  if (error) throw new BadRequestError(error);

  await fabricRepository.update(id, fabricData);
  return await fabricRepository.findOneBy({ IdFab: id });
};

const deleteFabric = async (id: number) => {
  if (!id) throw new BadRequestError("Missing Id");

  return await fabricRepository.delete(id);
};

export default {
  findFabric,
  createFabric,
  updateFabric,
  deleteFabric
}