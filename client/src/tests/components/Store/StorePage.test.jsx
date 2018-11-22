import React from 'react';
import { shallow } from 'enzyme';
import {
  StorePage,
  mapStateToProps
} from '../../../components/Store/StorePage';
import mockGroceries from '../../__mocks__/mockGroceries';
import mockCartItems from '../../__mocks__/mockCartItems';

const setup = () => {
  const props = {
    groceries: mockGroceries,
    cartItems: [],
    isLoading: false,
    checkingOut: false,
    fetchGroceries: jest.fn(),
    removeGroceryFromCart: jest.fn(),
    addGroceryToCart: jest.fn(),
    clearGroceryCart: jest.fn(),
    checkout: jest.fn(() => Promise.resolve()),
  };

  const wrapper = shallow(<StorePage {...props} />);

  return { wrapper, props };
};

describe('StorePage Component', () => {
  const { wrapper, props } = setup();
  afterEach(() => wrapper.setState({
    displayModal: false,
    orderProcessed: false
  }));

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a ToastContainer', () => {
    expect(wrapper.find('ToastContainer').length).toBe(1);
  });

  it('should render GroceryItemList component', () => {
    expect(wrapper.find('GroceryItemList').length).toBe(1);
  });

  it('should render Cart if displayModal is true', () => {
    wrapper.setState({ displayModal: true });
    expect(wrapper.find('Cart').length).toBe(1);
  });

  describe('toggleModal method', () => {
    it('should be called when the cart icon is clicked', () => {
      const toggleModalSpy = jest.spyOn(wrapper.instance(), 'toggleModal');
      wrapper.instance().toggleModal();
      expect(toggleModalSpy).toHaveBeenCalled();
    });

    it('should clear the grocery cart if order has been processed', () => {
      wrapper.setState({ orderProcessed: true }).setProps({ cartItems: [] });
      wrapper.instance().toggleModal();
      expect(wrapper.instance().props.cartItems).toEqual([]);
    });
  });


  it('should call handleCheckout', () => {
    const handleCheckoutSpy = jest.spyOn(wrapper.instance(), 'handleCheckout');
    wrapper.instance().handleCheckout(props.cartItems);
    wrapper.instance().handleCheckout(mockCartItems);
    expect(handleCheckoutSpy).toHaveBeenCalled();
  });

  describe('mapStateToProps', () => {
    it('returns an object from store', () => {
      const connectedProps = mapStateToProps({
        allGroceries: {
          isLoading: false,
          groceries: mockGroceries
        },
        allCartItems: { cartItems: mockCartItems, checkingOut: false }
      });
      expect(connectedProps).toEqual({
        isLoading: false,
        groceries: mockGroceries,
        checkingOut: false,
        cartItems: mockCartItems
      });
    });
  });
});
