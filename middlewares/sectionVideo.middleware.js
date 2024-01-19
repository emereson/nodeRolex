import { SectionVideo } from '../models/sectionVideo.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistSectionVideo = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const sectionVideo = await SectionVideo.findOne({
    where: {
      id,
    },
  });

  if (!sectionVideo) {
    return next(new AppError(`sectionVideo with id: ${id} not found `, 404));
  }

  req.sectionVideo = sectionVideo;

  next();
});
