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
router.patch(
  `${baseUrl}/:id`,
  validate.validateParams,
  validate.validateUpdate,
  groceryItemController.updateGrocery
);
router.patch('/api/v1/checkout', groceryItemController.checkoutCart);

export default router;
