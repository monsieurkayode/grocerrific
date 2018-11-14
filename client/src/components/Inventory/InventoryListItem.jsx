import React from 'react';
import { func } from 'prop-types';

const InventoryListItem = ({ openModal }) => (
  <div className="inventory__item_wrapper">
    <div className="item-name">Potatoes</div>
    <div className="item-price">&#8358;77</div>
    <div className="item-quantity">10</div>
    <div className="buttons">
      <button
        onClick={() => openModal({
          id: '11',
          name: 'Potatoes',
          price: 77,
          quantity: 10
        })}
        className="edit"
        type="button"
      >
        Edit
      </button>
      <button className="delete" type="button">Delete</button>
    </div>
  </div>
);

InventoryListItem.propTypes = {
  openModal: func.isRequired
};

export default InventoryListItem;
