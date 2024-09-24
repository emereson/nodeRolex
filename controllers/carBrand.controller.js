import { catchAsync } from '../utils/catchAsync.js';
import { CarBrand } from '../models/carBrand.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const carBrands = await CarBrand.findAll({
    where: {
      yearCarId: id,
    },
  });

  return res.status(200).json({
    status: 'Success',
    results: carBrands.length,
    carBrands,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { carBrand } = req;

  return res.status(200).json({
    status: 'Success',
    carBrand,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { year, brand } = req.body;

  const carBrand = await CarBrand.create({
    year,
    brand,
  });

  res.status(201).json({
    status: 'success',
    message: 'the carBrand has been created successfully!',
    carBrand,
  });
});

export const update = catchAsync(async (req, res) => {
  const { year, brand } = req.body;
  const { carBrand } = req;

  await carBrand.update({ year, brand });

  return res.status(200).json({
    status: 'success',
    message: 'carBrand information has been updated',
    carBrand,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { carBrand } = req;

  await carBrand.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The carBrand with id: ${carBrand.id} has been deleted`,
  });
});
