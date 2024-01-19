import express from 'express';
import { upload } from '../utils/multer.js';
import * as photoAlbumMiddleware from '../middlewares/photoAlbum.middleware.js';
import * as photoAlbumController from '../controllers/photoAlbum.controllers.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as sectionMiddleware from '../middlewares/section.middleware.js';

const router = express.Router();

router.get('/', photoAlbumController.findAll);
router.get(
  '/:id',
  photoAlbumMiddleware.validExistPhotoAlbum,
  photoAlbumController.findOne
);

router.use(authMiddleware.protect);
router.delete(
  '/section/:id',
  sectionMiddleware.validExistSection,
  photoAlbumController.deleteAllElement
);

router
  .route('/:id')
  .post(
    upload.fields([{ name: 'linkImg', maxCount: 50 }]),
    sectionMiddleware.validExistSection,
    photoAlbumController.create
  )
  .delete(
    photoAlbumMiddleware.validExistPhotoAlbum,
    photoAlbumController.deleteElement
  );

const photoAlbumRouter = router;

export { photoAlbumRouter };
