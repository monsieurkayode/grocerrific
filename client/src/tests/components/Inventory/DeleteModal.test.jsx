import React from 'react';
import { shallow } from 'enzyme';
import DeleteModal from '../../../components/Inventory/DeleteModal';

const setup = () => {
  const props = {
    id: '1',
    name: 'Grocery',
    closeModal: jest.fn(),
    handleDelete: jest.fn(),
    deleting: false
  };
  const wrapper = shallow(<DeleteModal {...props} />);

  return { wrapper, props };
};

describe('DeleteModal Component', () => {
  const { wrapper, props } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleDelete when the delete button is clicked', () => {
    const deleteButton = wrapper.find('button');
    deleteButton.simulate('click');
    expect(props.handleDelete).toHaveBeenCalled();
    expect(props.handleDelete).toHaveBeenCalledWith('1');
  });

  it('should set the text on the delete button to Deleting... when deleting',
    () => {
      wrapper.setProps({ deleting: true });
      const deleteButton = wrapper.find('button');
      expect(deleteButton.text()).toBe('Deleting...');
    });
});
