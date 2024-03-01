import { Fabric } from './fabricModel';
import { AppDataSource } from '../../db/dataSource';

const fabricRepository = AppDataSource.getRepository(Fabric);

const findFabric = async () => {
  return await fabricRepository.find();
};

const createFabric = async (fabricData: Partial<Fabric>) => {
  const fabric = fabricRepository.create(fabricData);
  return await fabricRepository.save(fabric);
};

const updateFabric = async (id: number, fabricData: Partial<Fabric>) => {
  await fabricRepository.update(id, fabricData);
  return await fabricRepository.findOneBy({ IdFab: id });
};

const deleteFabric = async (id: number) => {
  return await fabricRepository.delete(id);
};

export default {
  findFabric,
  createFabric,
  updateFabric,
  deleteFabric
}