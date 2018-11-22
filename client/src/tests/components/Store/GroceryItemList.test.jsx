import React from 'react';
import { shallow } from 'enzyme';
import GroceryItemList from '../../../components/Store/GroceryItemList';
import mockCartItems from '../../__mocks__/mockCartItems';
import mockGroceries from '../../__mocks__/mockGroceries';

const setup = () => {
  const props = {
    cartItems: mockCartItems,
    groceries: mockGroceries,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    loading: false
  };

  return shallow(<GroceryItemList {...props} />);
};

describe('GroceryItemList Component', () => {
  const wrapper = setup();
  afterEach(() => wrapper.setProps({ loading: false }));

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Loader when loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loader').length).toBe(1);
  });

  it('should render three GroceryItem children component', () => {
    expect(wrapper.find('GroceryItem').length).toBe(3);
  });

  it('should render a NoContent component if there are no groceries', () => {
    wrapper.setProps({ groceries: [] });
    expect(wrapper.find('NoContent').length).toBe(1);
  });
});
