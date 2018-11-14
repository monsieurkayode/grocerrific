import React from 'react';
import { func } from 'prop-types';

import InventoryListItem from './InventoryListItem';

const InventoryList = ({ openModal }) => (
  <div className="inventory__list">
    <div className="table-header">
      <div className="name">Name</div>
      <div>Price</div>
      <div>Stock</div>
      <div className="action">&nbsp;</div>
    </div>
    <InventoryListItem openModal={openModal} />
    <InventoryListItem openModal={openModal} />
    <InventoryListItem openModal={openModal} />
    <InventoryListItem openModal={openModal} />
    <InventoryListItem openModal={openModal} />
  </div>
);

InventoryList.propTypes = {
  openModal: func.isRequired
};

export default InventoryList;
