import React from 'react';
import { shallow } from 'enzyme';
import InventoryListItem from '../../../components/Inventory/InventoryListItem';
import mockGroceries from '../../__mocks__/mockGroceries';

const setup = () => {
  const grocery = mockGroceries[0];
  const props = {
    groceries: mockGroceries,
    openModal: jest.fn(),
    openDeleteModal: jest.fn(),
    loading: false,
    ...grocery
  };

  const wrapper = shallow(<InventoryListItem {...props} />);

  return { wrapper, props };
};

describe('InventoryListItem Component', () => {
  const { wrapper, props } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an Edit and Delete button', () => {
    expect(wrapper.find('.edit').length).toBe(1);
    expect(wrapper.find('.delete').length).toBe(1);
  });

  it('should call openModal when the Edit button is clicked', () => {
    const editButton = wrapper.find('.edit');
    editButton.simulate('click');
    expect(props.openModal).toHaveBeenCalled();
  });

  it('should call openDeleteModal when the Delete button is clicked', () => {
    const deleteButton = wrapper.find('.delete');
    deleteButton.simulate('click');
    expect(props.openDeleteModal).toHaveBeenCalled();
  });
});
