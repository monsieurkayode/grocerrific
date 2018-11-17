/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  func, arrayOf, shape, bool
} from 'prop-types';

import InventoryListItem from './InventoryListItem';
import Loader from '../common/Loader';

const InventoryList = ({ openModal, groceries, loading }) => (
  <div className="inventory__list">
    {loading && <Loader size={60} />}
    {!loading && (
      <div className="table-header">
        <div className="name">Name</div>
        <div>Price</div>
        <div>Stock</div>
        <div className="action">&nbsp;</div>
      </div>)
    }
    {!loading && groceries.map(grocery => (
      <InventoryListItem key={grocery._id} openModal={openModal} {...grocery} />
    ))}
  </div>
);

InventoryList.propTypes = {
  openModal: func.isRequired,
  groceries: arrayOf(shape({})).isRequired,
  loading: bool.isRequired
};

export default InventoryList;
