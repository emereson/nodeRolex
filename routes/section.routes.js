import express from 'express';
import { upload } from '../utils/multer.js';

import * as sectionMiddleware from '../middlewares/section.middleware.js';
import * as sectionController from '../controllers/section.controllers.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', sectionController.findAll);
router.get(
  '/:id',
  sectionMiddleware.validExistSection,
  sectionController.findOne
);

router.use(authMiddleware.protect);

router.post(
  '/',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'sectionImg', maxCount: 1 },
  ]),
  sectionController.create
);

router
  .route('/:id')
  .patch(
    upload.fields([
      { name: 'video', maxCount: 1 },
      { name: 'sectionImg', maxCount: 1 },
    ]),
    sectionMiddleware.validExistSection,
    sectionController.update
  )
  .delete(sectionMiddleware.validExistSection, sectionController.deleteElement);

const sectionRouter = router;

export { sectionRouter };
