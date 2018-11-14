import React from 'react';
import { func } from 'prop-types';

import Modal from '../common/Modal';
import CartItem from './CartItem';

const Cart = ({ closeModal }) => (
  <Modal
    closeModal={closeModal}
    title="grocery cart"
  >
    <div className="checkout-items">
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
    <div className="checkout-item-wrapper total">
      <p id="total">Total</p>
      <span className="total-price">&#8358;356</span>
    </div>
    <div className="checkout__button">
      <button className="buy uppercase" type="button">Checkout</button>
    </div>
  </Modal>
);

Cart.propTypes = {
  closeModal: func.isRequired
};

export default Cart;
