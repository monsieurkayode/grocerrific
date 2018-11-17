/* eslint-disable no-underscore-dangle */
import React from 'react';
import { arrayOf, shape, bool } from 'prop-types';

import GroceryItem from './GroceryItem';
import Loader from '../common/Loader';

const GroceryItemList = ({ groceries, loading }) => (
  <section id="grocery__display">
    {loading && <Loader size={60} />}
    <div className="grocery__list">
      {!loading
        && groceries
          .map(grocery => <GroceryItem key={grocery._id} {...grocery} />)}
    </div>
  </section>
);

GroceryItemList.propTypes = {
  groceries: arrayOf(shape({})).isRequired,
  loading: bool.isRequired
};

export default GroceryItemList;
