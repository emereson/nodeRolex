import { Gallery } from '../models/gallery.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistGallery = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const gallery = await Gallery.findOne({
    where: {
      id,
    },
  });

  if (!gallery) {
    return next(new AppError(`gallery with id: ${id} not found `, 404));
  }

  req.gallery = gallery;

  next();
});
