/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  func, arrayOf, shape, bool
} from 'prop-types';

import InventoryListItem from './InventoryListItem';
import Loader from '../common/Loader';
import NoContent from '../common/NoContent';

const InventoryList = ({
  openModal,
  openDeleteModal,
  groceries,
  loading
}) => (
  <div className="inventory__list">
    {loading && <Loader size={60} />}
    {!loading && groceries.length === 0 && (
      <NoContent content="There are currently no items in the Inventory" />
    )}
    {!loading && groceries.length > 0 && (
      <div className="table-header">
        <div className="name">Name</div>
        <div>Price</div>
        <div>Stock</div>
        <div className="action">&nbsp;</div>
      </div>
    )}
    {!loading
      && groceries.map(grocery => (
        <InventoryListItem
          key={grocery._id}
          openModal={openModal}
          openDeleteModal={openDeleteModal}
          {...grocery}
        />
      ))}
  </div>
);

InventoryList.propTypes = {
  openModal: func.isRequired,
  openDeleteModal: func.isRequired,
  groceries: arrayOf(shape({})).isRequired,
  loading: bool.isRequired,
};

export default InventoryList;
