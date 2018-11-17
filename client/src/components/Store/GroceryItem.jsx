/* eslint-disable no-underscore-dangle */
import React from 'react';
import { string, number } from 'prop-types';

import defaultImage from '../../assets/images/groceries.jpg';

const GroceryItem = ({
  name,
  price,
  quantity
}) => (
  <div className="grocery__list_item">
    <div className="image__wrapper">
      <img src={defaultImage} alt="" />
    </div>
    <article className="grocery__info">
      <h3 className="grocery__name">
        {name}<span className="grocery__price">&#8358;{price}</span>
      </h3>
      <div className="grocery__buttons">
        <button
          className="add uppercase"
          type="button"
          disabled={quantity === 0}
        >
          {quantity === 0 ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </article>
  </div>
);

GroceryItem.propTypes = {
  name: string.isRequired,
  price: number.isRequired,
  quantity: number.isRequired
};

export default GroceryItem;
