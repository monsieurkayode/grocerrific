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
  onChange
}) => (
  <div className={field}>
    <label htmlFor={name}>{label}&nbsp;<span>*</span></label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={error.length > 0 && 'alert'}
    />
    { error.length > 0 && <div className="error">{error}</div> }
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
  onChange: func.isRequired
};

export default TextField;
