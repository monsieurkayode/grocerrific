/* eslint-disable no-underscore-dangle */
import React from 'react';
import { func, string, number } from 'prop-types';

const InventoryListItem = ({
  openModal,
  openDeleteModal,
  _id,
  name,
  quantity,
  price
}) => (
  <div className="inventory__item_wrapper">
    <div className="item-name">{name}</div>
    <div className="item-price">&#8358;{price}</div>
    <div className="item-quantity">{quantity}</div>
    <div className="buttons">
      <button
        onClick={() => openModal({
          id: _id,
          name,
          price,
          quantity,
        })}
        className="edit"
        type="button"
      >
        Edit
      </button>
      <button
        className="delete"
        type="button"
        onClick={() => openDeleteModal({ id: _id, name })}
      >
        Delete
      </button>
    </div>
  </div>
);

InventoryListItem.propTypes = {
  openModal: func.isRequired,
  openDeleteModal: func.isRequired,
  _id: string.isRequired,
  name: string.isRequired,
  price: number.isRequired,
  quantity: number.isRequired
};

export default InventoryListItem;
