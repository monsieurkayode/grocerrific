import React from 'react';

import GroceryItem from './GroceryItem';

const GroceryItemList = () => (
  <section id="grocery__display">
    <div className="grocery__list">
      <GroceryItem />
      <GroceryItem />
      <GroceryItem />
      <GroceryItem />
      <GroceryItem />
      <GroceryItem />
      <GroceryItem />
      <GroceryItem />
    </div>
  </section>
);

export default GroceryItemList;
