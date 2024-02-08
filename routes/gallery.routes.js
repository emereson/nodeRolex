import express from 'express';
import { upload } from '../utils/multer.js';
import * as galleryMiddleware from '../middlewares/gallery.middleware.js';
import * as galleryController from '../controllers/gallery.controllers.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as sectionMiddleware from '../middlewares/section.middleware.js';

const router = express.Router();

router.get('/', galleryController.findAll);
router.get(
  '/:id',
  galleryMiddleware.validExistGallery,
  galleryController.findOne
);

router.use(authMiddleware.protect);
router.delete(
  '/section/:id',
  sectionMiddleware.validExistSection,
  galleryController.deleteAllElement
);

router
  .route('/:id')
  .post(
    upload.fields([{ name: 'linkImg', maxCount: 50 }]),
    sectionMiddleware.validExistSection,
    galleryController.create
  )
  .delete(galleryMiddleware.validExistGallery, galleryController.deleteElement);

const galleryRouter = router;

export { galleryRouter };
