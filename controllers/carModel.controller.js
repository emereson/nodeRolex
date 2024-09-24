import { catchAsync } from '../utils/catchAsync.js';
import { CarModel } from '../models/carModel.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const carModels = await CarModel.findAll({
    where: {
      brandCarId: id,
    },
    attributes: {
      exclude: ['carData'],
    },
  });

  return res.status(200).json({
    status: 'Success',
    results: carModels.length,
    carModels,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { carModel } = req;

  return res.status(200).json({
    status: 'Success',
    carModel,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { idTwo, model, carData } = req.body;

  const carModel = await CarModel.create({
    idTwo,
    model,
    carData,
  });

  res.status(201).json({
    status: 'success',
    message: 'the carModel has been created successfully!',
    carModel,
  });
});

export const update = catchAsync(async (req, res) => {
  const { carModel } = req;
  const { idTwo, model, carData } = req.body;

  await carModel.update({ idTwo, model, carData });

  return res.status(200).json({
    status: 'success',
    message: 'carModel information has been updated',
    carModel,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { carModel } = req;

  await carModel.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The carModel with id: ${carModel.id} has been deleted`,
  });
});
