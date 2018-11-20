import React from 'react';
import { string } from 'prop-types';

const NoContent = ({ content }) => (
  <div className="no-content">
    <i className="material-icons">info</i>
    <h3 className="no-content-info">
      {content}
    </h3>
  </div>
);

NoContent.propTypes = {
  content: string.isRequired
};

export default NoContent;
