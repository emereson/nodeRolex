import { Gallery } from '../models/gallery.model.js';
import { PhotoAlbum } from '../models/photoAlbum.model.js';
import { Section } from '../models/section.model.js';
import { SectionDescription } from '../models/sectionDescription.model.js';
import { SectionVideo } from '../models/sectionVideo.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistSection = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const section = await Section.findOne({
    where: {
      id,
    },
    include: [
      {
        model: SectionDescription,
      },
      {
        model: PhotoAlbum,
      },
      {
        model: SectionVideo,
      },
      {
        model: Gallery,
      },
    ],
  });

  if (!section) {
    return next(new AppError(`section with id: ${id} not found `, 404));
  }

  req.section = section;

  next();
});
