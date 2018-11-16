import { STATUS_CODES } from 'http';
import mongoose from 'mongoose';
import { validateForm } from '../../shared/validator';
import errorHandler from '../helpers/errorHandler';
import GroceryItem from '../models/groceryItem';

export const validateGrocery = (req, res, next) => {
  const { errors, isValid } = validateForm(req.body);
  if (isValid) return next();
  return errorHandler(422, errors, res);
};

export const checkDuplicate = (req, res, next) => {
  const { name } = req.body;
  const query = GroceryItem.where({ name: name.trim().toLowerCase() });

  return query.countDocuments((err, count) => {
    if (err) return errorHandler(500, err, res);
    if (count >= 1) {
      return res.status(409).send({
        status: STATUS_CODES[409],
        message: `${req.body.name} already added`
      });
    }
    next();
  });
};

export const validateUpdate = (req, res, next) => {
  const { errors, isValid } = validateForm(req.body, false);
  if (isValid) return next();
  return errorHandler(422, errors, res);
};

export const validateParams = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorHandler(404, 'Grocery Item not found', res);
  }
  next();
};
