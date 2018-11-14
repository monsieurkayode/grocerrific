import React from 'react';

import defaultImage from '../../assets/images/groceries.jpg';

const GroceryItem = () => (
  <div className="grocery__list_item">
    <div className="image__wrapper">
      <img src={defaultImage} alt="" />
    </div>
    <article className="grocery__info">
      <h3 className="grocery__name">
        Potatoes <span className="grocery__price">&#8358;77</span>
      </h3>
      <div className="grocery__buttons">
        <button className="add uppercase" type="button">
          Add to cart
        </button>
      </div>
    </article>
  </div>
);

export default GroceryItem;
