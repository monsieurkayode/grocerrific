import { STATUS_CODES } from 'http';
import { Types } from 'mongoose';

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

export const updateGrocery = (req, res) => {
  const query = GroceryItem.findById(req.params.id);

  return query.exec((err, grocery) => {
    if (err) return errorHandler(400, err, res);

    if (grocery) {
      grocery.set({
        name: req.body.name || grocery.name,
        quantity: req.body.quantity || grocery.quantity,
        price: req.body.price || grocery.price
      });
      return grocery.save((error, updatedGrocery) => {
        if (error) return errorHandler(400, err, res);
        return res.status(200).send({
          status: STATUS_CODES[200],
          grocery: updatedGrocery,
          message: `${grocery.name} updated in Inventory`
        });
      });
    }
    return res.status(404).send({
      status: STATUS_CODES[404],
      message: 'Grocery Item not found'
    });
  });
};

export const deleteGrocery = (req, res) => {
  const query = GroceryItem.findByIdAndDelete(req.params.id);

  return query.exec((err, grocery) => {
    if (err) return errorHandler(400, err, res);
    if (grocery) {
      return res.status(200).send({
        status: STATUS_CODES[200],
        message: `${grocery.name} removed from Inventory`
      });
    }
    return res.status(404).send({
      status: STATUS_CODES[404],
      message: 'Grocery Item not found'
    });
  });
};

export const checkoutCart = async (req, res) => {
  let { cart } = req.body;
  const checkoutStatus = [];
  cart = cart.filter(item => Types.ObjectId.isValid(item.id));

  if (cart.length === 0) return errorHandler(422, 'Your cart is empty', res);

  try {
    await Promise.all(cart.map(async (item) => {
      await GroceryItem.findById(item.id, (err, grocery) => {
        let response = {};
        if (!grocery) {
          response = {
            id: item.id,
            status: 'fail',
            message: 'Grocery Item not available',
          };
        }
        if (grocery && (grocery.quantity - item.quantity) < 0) {
          response = {
            id: item.id,
            status: 'fail',
            message: `Only ${grocery.quantity} ${grocery.name} available`,
          };
        }
        if (grocery && (grocery.quantity - item.quantity) >= 0) {
          response = {
            id: item.id,
            status: 'ok',
            message: 'Item order has been processed'
          };
          grocery.updateOne({ $inc: { quantity: -item.quantity } }, () => {});
        }
        checkoutStatus.push(response);
      });
    }));
    return res.status(200).send({
      status: STATUS_CODES[200],
      checkoutStatus
    });
  } catch (error) {
    return errorHandler(500, 'An error occured!', res);
  }
};
