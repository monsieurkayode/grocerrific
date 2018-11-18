import React from 'react';
import { func, shape, arrayOf } from 'prop-types';

import Modal from '../common/Modal';
import CartItem from './CartItem';

const Cart = ({
  closeModal,
  cartItems,
  removeFromCart
}) => {
  const computeTotal = () => (
    cartItems.reduce(
      (acc, cartItem) => acc + (cartItem.price * cartItem.quantity), 0
    )
  );

  return (
    <Modal
      closeModal={closeModal}
      title="grocery cart"
    >
      <div className="checkout-items">
        {cartItems.map(cartItem => (
          <CartItem
            key={cartItem.id}
            removeFromCart={removeFromCart}
            {...cartItem}
            cartItems={cartItems}
          />
        ))}
      </div>
      <div className="checkout-item-wrapper total">
        <p id="total">Total</p>
        <span className="total-price">&#8358;{computeTotal()}</span>
      </div>
      <div className="checkout__button">
        <button className="buy uppercase" type="button">Checkout</button>
      </div>
    </Modal>
  );
};


Cart.propTypes = {
  closeModal: func.isRequired,
  removeFromCart: func.isRequired,
  cartItems: arrayOf(shape({})).isRequired
};

export default Cart;
