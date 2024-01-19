import { PhotoAlbum } from '../models/photoAlbum.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistPhotoAlbum = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const photoAlbum = await PhotoAlbum.findOne({
    where: {
      id,
    },
  });

  if (!photoAlbum) {
    return next(
      new AppError(`photoAlbumCategory with id: ${id} not found `, 404)
    );
  }

  req.photoAlbum = photoAlbum;

  next();
});
