import express from 'express';
import * as sectionDescriptionMiddleware from '../middlewares/sectionDescription.middleware.js';
import * as sectionDescriptionController from '../controllers/sectionDescription.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', sectionDescriptionController.findAll);
router.get(
  '/:id',
  sectionDescriptionMiddleware.validExistSectionDescription,
  sectionDescriptionController.findOne
);

router.use(authMiddleware.protect);
router
  .route('/:id')
  .post(sectionDescriptionController.create)
  .patch(
    sectionDescriptionMiddleware.validExistSectionDescription,
    sectionDescriptionController.update
  )
  .delete(
    sectionDescriptionMiddleware.validExistSectionDescription,
    sectionDescriptionController.deleteElement
  );

const sectionDescriptionRouter = router;

export { sectionDescriptionRouter };
