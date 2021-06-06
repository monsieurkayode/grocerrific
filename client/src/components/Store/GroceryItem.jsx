/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  string,
  number,
  func,
  shape,
  arrayOf
} from 'prop-types';

import defaultImage from '../../assets/images/groceries.jpg';

const GroceryItem = ({
  _id,
  name,
  price,
  quantity,
  imageUrl,
  addToCart,
  removeFromCart,
  cartItems
}) => {
  const itemAdded = () => cartItems.findIndex(item => item.id === _id) >= 0;

  const addOrRemove = () => {
    if (!itemAdded()) {
      return addToCart({
        id: _id,
        name,
        price,
        maxQuantity: quantity,
        quantity: 1
      });
    }

    return removeFromCart(_id);
  };

  const buttonText = () => {
    if (quantity === 0) return 'Out of stock';
    return itemAdded()
      ? 'Remove from cart'
      : 'Add to cart';
  };

  return (
    <div className="grocery__list_item">
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="image__wrapper effect"
      />
      <article className="grocery__info">
        <h3 className="grocery__name">
          {name}<span className="grocery__price">&#8358;{price}</span>
        </h3>
        <div className="grocery__buttons">
          <button
            className="add uppercase"
            type="button"
            onClick={() => addOrRemove()}
            disabled={quantity === 0}
          >
            {buttonText()}
          </button>
        </div>
      </article>
    </div>
  );
};

GroceryItem.defaultProps = {
  imageUrl: defaultImage
};

GroceryItem.propTypes = {
  _id: string.isRequired,
  name: string.isRequired,
  price: number.isRequired,
  quantity: number.isRequired,
  imageUrl: string,
  addToCart: func.isRequired,
  removeFromCart: func.isRequired,
  cartItems: arrayOf(shape({})).isRequired
};

export default GroceryItem;
