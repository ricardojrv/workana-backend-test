// Import the necessary functions from the service file
import { NextFunction, Request, Response } from 'express';
import service from './fabricService';



export const fetchFabric = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fabrics = await service.findFabric();
    res.json(fabrics);
  } catch (error) {
    next(error);
  }
};

export const createFabric = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newFabric = await service.createFabric(req.body);
    res.status(201).json(newFabric);
  } catch (error) {
    next(error);
  }
};

export const updateFabric = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const fabric = await service.updateFabric(Number(id), req.body);
    if (fabric) {
      res.json(fabric);
    } else {
      res.status(404).json({ message: 'Fabric not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteFabric = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await service.deleteFabric(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
