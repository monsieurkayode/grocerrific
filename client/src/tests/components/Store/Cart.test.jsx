import React from 'react';
import { shallow } from 'enzyme';
import Cart from '../../../components/Store/Cart';
import mockCartItems from '../../__mocks__/mockCartItems';

const setup = () => {
  const props = {
    cartItems: mockCartItems,
    closeModal: jest.fn(),
    removeFromCart: jest.fn(),
    checkout: jest.fn(() => Promise.resolve()),
    checkingOut: false,
  };

  const wrapper = shallow(<Cart {...props} />);

  return { wrapper, props };
};

describe('Cart Component', () => {
  const { wrapper, props } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render checkout button', () => {
    expect(wrapper.find('.buy').length).toBe(1);
  });

  it('checkout button should have text Processing... while checkingOut', () => {
    wrapper.setProps({ checkingOut: true });
    expect(wrapper.find('.buy').text()).toEqual('Processing...');
  });

  it('should call checkout when the checkout button is clicked', () => {
    const checkoutButton = wrapper.find('.buy');
    checkoutButton.simulate('click');
    expect(props.checkout).toHaveBeenCalled();
  });
});
