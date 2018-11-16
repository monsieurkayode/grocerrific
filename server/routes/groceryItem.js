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

export default router;
