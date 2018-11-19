import React from 'react';
import { func, string, bool } from 'prop-types';

import Modal from '../common/Modal';

const DeleteModal = ({
  id,
  name,
  closeModal,
  handleDelete,
  deleting
}) => (
  <Modal
    title={`Delete ${name}`}
    closeModal={closeModal}
  >
    <div className="notice">
      <p>Are you sure? This action cannot be undone!</p>
    </div>
    <div className="checkout__button">
      <button
        onClick={() => handleDelete(id)}
        className="buy uppercase"
        type="button"
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Confirm'}
      </button>
    </div>
  </Modal>
);

DeleteModal.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  deleting: bool.isRequired,
  closeModal: func.isRequired,
  handleDelete: func.isRequired
};

export default DeleteModal;
