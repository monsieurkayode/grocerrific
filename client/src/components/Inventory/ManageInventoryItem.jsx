import React from 'react';
import {
  func, shape, string, bool
} from 'prop-types';

import Modal from '../common/Modal';
import TextField from '../common/TextField';

const ManageInventoryItem = ({
  title,
  closeModal,
  groceryItem,
  handleInputChange,
  handleSubmit,
  handleFocus,
  errors,
  saving
}) => (
  <Modal
    title={`${title} Grocery`}
    closeModal={closeModal}
  >
    <form className="inventory__form" onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        placeholder="Tomato"
        error={errors.name}
        value={groceryItem.name}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />

      <div className="form-field bottom">
        <TextField
          name="price"
          label="Price"
          placeholder="345"
          type="number"
          error={errors.price}
          value={groceryItem.price}
          field="inline__field"
          onChange={handleInputChange}
          onFocus={handleFocus}
        />

        <TextField
          name="quantity"
          label="Quantity"
          placeholder="17"
          type="number"
          error={errors.quantity}
          value={groceryItem.quantity}
          field="inline__field"
          onChange={handleInputChange}
          onFocus={handleFocus}
        />

      </div>
      <button
        className="buy uppercase clear"
        type="submit"
        disabled={saving}
      >
        {saving ? 'Saving...' : title}
      </button>
    </form>
  </Modal>
);

ManageInventoryItem.propTypes = {
  closeModal: func.isRequired,
  handleInputChange: func.isRequired,
  groceryItem: shape({}).isRequired,
  title: string.isRequired,
  handleSubmit: func.isRequired,
  errors: shape({}).isRequired,
  handleFocus: func.isRequired,
  saving: bool.isRequired
};

export default ManageInventoryItem;
