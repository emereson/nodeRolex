import { CarModel } from '../models/carModel.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistCarModel = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const carModel = await CarModel.findOne({
    where: {
      id,
    },
  });

  if (!carModel) {
    return next(new AppError(`carModel with id: ${id} not found `, 404));
  }

  req.carModel = carModel;
  next();
});
