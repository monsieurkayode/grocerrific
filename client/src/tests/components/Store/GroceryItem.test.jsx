import React from 'react';
import { shallow } from 'enzyme';
import GroceryItem from '../../../components/Store/GroceryItem';
import mockCartItems from '../../__mocks__/mockCartItems';
import mockGroceryItems from '../../__mocks__/mockGroceries';

const setup = () => {
  const groceryItem = mockGroceryItems[0];

  const props = {
    cartItems: [],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    checkingOut: false,
    ...groceryItem
  };

  const wrapper = shallow(<GroceryItem {...props} />);

  return { wrapper, props };
};

describe('GroceryItem Component', () => {
  const { wrapper, props } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render add to cart button', () => {
    const addToCartButton = wrapper.find('.add');
    expect(addToCartButton.length).toBe(1);
  });

  it('should call addToCart', () => {
    const addToCartButton = wrapper.find('.add');
    addToCartButton.simulate('click');
    expect(props.addToCart).toHaveBeenCalled();
  });

  describe('add to cart button should have text', () => {
    it('Add to cart if groceryItem is not yet added to cart', () => {
      const addToCartButton = wrapper.find('.add');
      expect(addToCartButton.text()).toEqual('Add to cart');
    });

    it('Remove from cart if item already added to cart', () => {
      wrapper.setProps({ cartItems: mockCartItems });
      const addToCartButton = wrapper.find('.add');
      expect(addToCartButton.text()).toEqual('Remove from cart');
    });

    it('Out of stock if item quantity is 0', () => {
      wrapper.setProps({ quantity: 0 });
      const addToCartButton = wrapper.find('.add');
      expect(addToCartButton.text()).toEqual('Out of stock');
    });
  });

  it('should call removeFromCart if item already in cart', () => {
    const removeFromCartButton = wrapper.find('.add');
    removeFromCartButton.simulate('click');
    expect(props.removeFromCart).toHaveBeenCalled();
  });
});
