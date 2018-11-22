import React from 'react';
import { shallow } from 'enzyme';
import InventoryList from '../../../components/Inventory/InventoryList';
import mockGroceries from '../../__mocks__/mockGroceries';

const setup = () => {
  const props = {
    groceries: mockGroceries,
    openModal: jest.fn(),
    openDeleteModal: jest.fn(),
    loading: false,
  };

  return shallow(<InventoryList {...props} />);
};

describe('InventoryList Component', () => {
  const wrapper = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render three InventoryListItem children components', () => {
    expect(wrapper.find('InventoryListItem').length).toBe(3);
  });

  it('should render a Loader component when loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loader').length).toBe(1);
  });

  it('should render a NoContent component when there are no groceries', () => {
    wrapper.setProps({ groceries: [], loading: false });
    expect(wrapper.find('NoContent').length).toBe(1);
  });
});
