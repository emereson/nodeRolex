import { catchAsync } from '../utils/catchAsync.js';
import { YearCar } from '../models/yearCar.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const yearCars = await YearCar.findAll({
    order: [['id', 'DESC']],
  });
  return res.status(200).json({
    status: 'Success',
    results: yearCars.length,
    yearCars,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { yearCar } = req;

  return res.status(200).json({
    status: 'Success',
    yearCar,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { year } = req.body;

  const yearCar = await YearCar.create({
    year,
  });

  res.status(201).json({
    status: 'success',
    message: 'the yearCar has been created successfully!',
    yearCar,
  });
});

export const update = catchAsync(async (req, res) => {
  const { year } = req.body;
  const { yearCar } = req;

  await yearCar.update({ year });

  return res.status(200).json({
    status: 'success',
    message: 'yearCar information has been updated',
    yearCar,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { yearCar } = req;

  await yearCar.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The yearCar with id: ${yearCar.id} has been deleted`,
  });
});
