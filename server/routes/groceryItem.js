import express from 'express';
import { fetchGroceries } from '../controllers/groceryItem';

const router = express.Router();
const baseUrl = '/api/v1/groceries';

router.get(`${baseUrl}`, fetchGroceries);

export default router;
