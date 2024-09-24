import { YearCar } from '../models/yearCar.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistYearCar = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const yearCar = await YearCar.findOne({
    where: {
      id,
    },
  });

  if (!yearCar) {
    return next(new AppError(`yearCar with id: ${id} not found `, 404));
  }

  req.yearCar = yearCar;
  next();
});
