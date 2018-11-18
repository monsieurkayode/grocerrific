/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  arrayOf, shape, bool, func
} from 'prop-types';

import GroceryItem from './GroceryItem';
import Loader from '../common/Loader';

const GroceryItemList = ({
  groceries,
  loading,
  addToCart,
  removeFromCart,
  cartItems
}) => (
  <section id="grocery__display">
    {loading && <Loader size={60} />}
    <div className="grocery__list">
      {!loading
        && groceries
          .map(grocery => (
            <GroceryItem
              key={grocery._id}
              {...grocery}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartItems={cartItems}
            />
          ))}
    </div>
  </section>
);

GroceryItemList.propTypes = {
  groceries: arrayOf(shape({})).isRequired,
  cartItems: arrayOf(shape({})).isRequired,
  loading: bool.isRequired,
  addToCart: func.isRequired,
  removeFromCart: func.isRequired
};

export default GroceryItemList;
