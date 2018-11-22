import React from 'react';
import { mount } from 'enzyme';
import TextField from '../../../components/common/TextField';

const setup = () => {
  const props = {
    name: '',
    label: '',
    placeholder: '',
    field: '',
    onChange: jest.fn(),
    onFocus: jest.fn()
  };

  const wrapper = mount(<TextField {...props} />);

  return { wrapper, props };
};

describe('TextField Component', () => {
  const { wrapper, props } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChange and onFocus function on text input', () => {
    const textInput = wrapper.find('input');
    textInput.simulate('change', { value: 'Hello' });
    expect(props.onChange).toHaveBeenCalled();
  });

  it('should have an error field', () => {
    const errorDiv = wrapper.find('.error');
    expect(errorDiv.length).toBe(1);
  });

  it('should set the visiblity of error div to visible if errors', () => {
    wrapper.setProps({ error: 'Error' });
    const errorDiv = wrapper.find('.error');
    expect(errorDiv.text()).toContain('Error');
    expect(errorDiv.props().style.visibility).toBe('visible');
  });
});
