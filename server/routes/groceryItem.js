import express from 'express';
import * as groceryItemController from '../controllers/groceryItem';
import * as validate from '../middlewares/groceryValidation';

const router = express.Router();
const baseUrl = '/api/v1/groceries';

router.get(`${baseUrl}`, groceryItemController.fetchGroceries);
router.post(
  `${baseUrl}`,
  validate.validateGrocery,
  validate.checkDuplicate,
  groceryItemController.addGrocery
);
router.delete(
  `${baseUrl}/:id`,
  validate.validateParams,
  groceryItemController.deleteGrocery
);

export default router;
