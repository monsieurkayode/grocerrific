import React from 'react';

const CartItem = () => (
  <div className="checkout-item-wrapper">
    <p className="item-name">Chapelli Vintage Single Speed</p>
    <span className="order">
      <button className="inc" type="button">-</button>
      <input className="quantity" type="number" defaultValue="1" />
      <button className="dec" type="button">+</button>
    </span>
    <span className="price">&#8358;317</span>
    <span className="remove">&times;</span>
  </div>
);

export default CartItem;
