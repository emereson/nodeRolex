import { CarBrand } from '../models/carBrand.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistCarBrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const carBrand = await CarBrand.findOne({
    where: {
      id,
    },
  });

  if (!carBrand) {
    return next(new AppError(`carBrand with id: ${id} not found `, 404));
  }

  req.carBrand = carBrand;
  next();
});
