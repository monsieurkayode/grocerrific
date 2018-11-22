import React from 'react';
import { shallow } from 'enzyme';
// eslint-disable-next-line max-len
import ManageInventoryItem from '../../../components/Inventory/ManageInventoryItem';

const setup = () => {
  const props = {
    title: 'Add',
    groceryItem: {
      name: '',
      quantity: '',
      price: ''
    },
    closeModal: jest.fn(),
    handleSubmit: jest.fn(),
    handleFocus: jest.fn(),
    handleInputChange: jest.fn(),
    saving: false,
    errors: {}
  };
  const wrapper = shallow(<ManageInventoryItem {...props} />);

  return { wrapper, props };
};

describe('ManageInventoryItem Component', () => {
  const { wrapper, props } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a form with three TextField children components', () => {
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('TextField').length).toBe(3);
  });

  it('should call handleSubmit when the form is submitted', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(props.handleSubmit).toHaveBeenCalled();
  });

  it('should display Add on the submit button when not saving', () => {
    const submitButton = wrapper.find('button');
    expect(submitButton.text()).toEqual('Add');
  });

  it('should display Saving... on the submit button while saving', () => {
    wrapper.setProps({ saving: true });
    const submitButton = wrapper.find('button');
    expect(submitButton.text()).toEqual('Saving...');
  });
});
