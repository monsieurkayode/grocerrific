import { STATUS_CODES } from 'http';

import GroceryItem from '../models/groceryItem';
import errorHandler from '../helpers/errorHandler';

export const fetchGroceries = (req, res) => {
  const query = GroceryItem.find().limit(8).sort({ _id: 'desc' });

  return query.exec((err, groceries) => {
    if (err) return errorHandler(500, err, res);

    return res.status(200).send({
      status: STATUS_CODES[200],
      groceries
    });
  });
};

export const addGrocery = (req, res) => {
  const { name, quantity, price } = req.body;
  const newGrocery = new GroceryItem({
    name,
    quantity,
    price
  });

  return newGrocery.save((err, grocery) => {
    if (err) return errorHandler(400, err, res);

    return res.status(201).send({
      status: STATUS_CODES[201],
      message: `${grocery.name} added to Inventory`,
      grocery
    });
  });
};

export const updateGrocery = () => {};
export const fetchGrocery = () => {};
export const deleteGrocery = () => {};
export const checkoutCart = () => {};
