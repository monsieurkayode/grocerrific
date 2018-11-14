import React from 'react';
import { func, shape, string } from 'prop-types';

import Modal from '../common/Modal';
import TextField from '../common/TextField';

const ManageInventoryItem = ({
  title,
  closeModal,
  groceryItem,
  handleInputChange
}) => (
  <Modal
    title={`${title} Grocery`}
    closeModal={closeModal}
  >
    <form className="inventory__form">
      <TextField
        name="name"
        label="Name"
        placeholder="Tomato"
        error="Name is required"
        value={groceryItem.name}
        onChange={handleInputChange}
      />

      <div className="form-field">
        <TextField
          name="price"
          label="Price"
          placeholder="345"
          type="number"
          error="Price is required"
          value={groceryItem.price}
          field="inline__field"
          onChange={handleInputChange}
        />

        <TextField
          name="quantity"
          label="Quantity"
          placeholder="17"
          type="number"
          error="Quantity is required"
          value={groceryItem.quantity}
          field="inline__field bottom"
          onChange={handleInputChange}
        />

      </div>
    </form>
    <button className="buy uppercase" type="submit">
      {title}
    </button>
  </Modal>
);

ManageInventoryItem.propTypes = {
  closeModal: func.isRequired,
  handleInputChange: func.isRequired,
  groceryItem: shape({}).isRequired,
  title: string.isRequired
};

export default ManageInventoryItem;
