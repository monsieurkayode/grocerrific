import React from 'react';
import { shallow } from 'enzyme';
import {
  CartItem,
  mapStateToProps
} from '../../../components/Store/CartItem';
import mockCartItems from '../../__mocks__/mockCartItems';
import mockCheckutStatus from '../../__mocks__/mockCheckoutStatus';

const setup = () => {
  const cartItem = mockCartItems[0];

  const props = {
    cartItems: mockCartItems,
    isLoading: false,
    checkingOut: false,
    removeFromCart: jest.fn(),
    updateCartItemQuantity: jest.fn(),
    checkoutStatus: mockCheckutStatus,
    ...cartItem
  };

  const wrapper = shallow(<CartItem {...props} />);

  return { wrapper, props };
};

describe('CartItem Component', () => {
  const { wrapper, props } = setup();
  beforeAll(() => wrapper.setState({ orderQuantity: 1 }));

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should be call handleInputChange method', () => {
    const event = { target: { value: 2, name: 'quantity' } };
    const handleInputChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleInputChange'
    );
    wrapper.instance().handleInputChange(event);
    wrapper.instance().handleInputChange({
      target: { value: '', name: 'quantity' }
    });
    expect(handleInputChangeSpy).toHaveBeenCalled();
  });

  it('should call revertInvalidQuantity method', () => {
    const event = { target: { value: '', name: 'quantity' } };
    const revertSpy = jest.spyOn(wrapper.instance(), 'revertInvalidQuantity');
    wrapper.instance().revertInvalidQuantity(event);
    expect(revertSpy).toHaveBeenCalledWith(event);
  });

  it('should call incrementQuantity method', () => {
    const incrementSpy = jest.spyOn(wrapper.instance(), 'incrementQuantity');
    wrapper.instance().incrementQuantity();
    expect(incrementSpy).toHaveBeenCalled();
  });

  it('should call decrementQuantity method', () => {
    const decrementSpy = jest.spyOn(wrapper.instance(), 'decrementQuantity');
    wrapper.instance().decrementQuantity();
    expect(decrementSpy).toHaveBeenCalled();
  });

  it('should call removeFromCart onClick of x button', () => {
    const removeButton = wrapper.find('.remove');
    removeButton.simulate('click');
    expect(props.removeFromCart).toHaveBeenCalled();
  });

  describe('mapStateToProps', () => {
    it('returns an object from store', () => {
      const connectedProps = mapStateToProps({
        allCartItems: { checkoutStatus: mockCheckutStatus }
      });

      expect(connectedProps).toEqual({ checkoutStatus: mockCheckutStatus });
    });
  });
});
