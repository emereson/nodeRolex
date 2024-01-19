import { SectionDescription } from '../models/sectionDescription.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistSectionDescription = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const sectionDescription = await SectionDescription.findOne({
      where: {
        id,
      },
    });

    if (!sectionDescription) {
      return next(
        new AppError(`sectionDescription with id: ${id} not found `, 404)
      );
    }

    req.sectionDescription = sectionDescription;

    next();
  }
);
