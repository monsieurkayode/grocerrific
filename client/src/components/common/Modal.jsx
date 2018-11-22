/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { node, string, func } from 'prop-types';

const Modal = ({ children, title, closeModal }) => (
  <div className="modal">
    <div className="modal__main">
      <div className="heading">
        <h2>{ title }
          <span
            role="button"
            tabIndex="0"
            onClick={() => closeModal()}
            className="close"
          >
            &times;
          </span>
        </h2>
      </div>
      { children }
    </div>
  </div>
);

Modal.propTypes = {
  children: node.isRequired,
  title: string.isRequired,
  closeModal: func.isRequired
};

export default Modal;
