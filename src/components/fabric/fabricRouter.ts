import { Router } from 'express';
import { createFabric, deleteFabric, fetchFabric, updateFabric } from './fabricController';

const fabricRouter = Router();


fabricRouter.get('/', fetchFabric)
  .post('/', createFabric)
  .put('/:id', updateFabric)
  .delete('/:id', deleteFabric);

export default fabricRouter;