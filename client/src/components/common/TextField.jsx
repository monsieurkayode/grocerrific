import React from 'react';
import {
  oneOfType,
  string,
  number,
  func
} from 'prop-types';

const TextField = ({
  name,
  label,
  placeholder,
  type,
  error,
  value,
  field,
  onChange,
  onFocus
}) => (
  <div className={field}>
    <label htmlFor={name}>{label}&nbsp;<span>*</span></label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      className={error.length > 0 ? 'alert' : ''}
    />
    <div
      style={{ visibility: error.length > 0 ? 'visible' : 'hidden' }}
      className="error"
    >
      &nbsp;{error}
    </div>
  </div>
);

TextField.defaultProps = {
  type: 'text',
  field: 'form-field',
  value: '',
  error: ''
};

TextField.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  placeholder: string.isRequired,
  type: string,
  error: string,
  value: oneOfType([string, number]),
  field: string,
  onChange: func.isRequired,
  onFocus: func.isRequired
};

export default TextField;
