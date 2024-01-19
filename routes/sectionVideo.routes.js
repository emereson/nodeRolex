import express from 'express';
import { upload } from '../utils/multer.js';
import * as sectionVideoMiddleware from '../middlewares/sectionVideo.middleware.js';
import * as sectionVideoController from '../controllers/sectionVideo.controllers.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as sectionMiddleware from '../middlewares/section.middleware.js';

const router = express.Router();

router.get('/', sectionVideoController.findAll);
router.get(
  '/:id',
  sectionVideoMiddleware.validExistSectionVideo,
  sectionVideoController.findOne
);

router.use(authMiddleware.protect);
router
  .route('/:id')
  .post(
    upload.single('linkImg'),
    sectionMiddleware.validExistSection,
    sectionVideoController.create
  )
  .patch(
    upload.single('linkImg'),
    sectionVideoMiddleware.validExistSectionVideo,
    sectionVideoController.update
  )
  .delete(
    sectionVideoMiddleware.validExistSectionVideo,
    sectionVideoController.deleteElement
  );

const sectionVideoRouter = router;

export { sectionVideoRouter };
