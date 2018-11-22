import * as types from '../../actions/actionTypes';
import { initialCartItems } from '../../reducers/initialState';
import cartReducer from '../../reducers/cartReducer';
import mockCartItems from '../__mocks__/mockCartItems';
import mockCheckoutStatus from '../__mocks__/mockCheckoutStatus';

describe('Cart Reducer', () => {
  it('returns initial state', () => {
    expect(cartReducer(undefined, {})).toEqual(initialCartItems);
  });

  describe('ADD_GROCERY_TO_CART', () => {
    it('should add grocery to cartItems in store', () => {
      const action = {
        type: types.ADD_GROCERY_TO_CART,
        grocery: mockCartItems[0]
      };

      const newState = cartReducer(initialCartItems, action);

      expect(newState.cartItems.length).toBe(1);
    });
  });

  describe('REMOVE_GROCERY_FROM_CART', () => {
    it('should remove grocery from cartItems in store', () => {
      const action = {
        type: types.REMOVE_GROCERY_FROM_CART,
        id: mockCartItems[0].id
      };

      const newState = cartReducer({
        ...initialCartItems,
        cartItems: [mockCartItems[0]]
      }, action);

      expect(newState.cartItems.length).toBe(0);
    });
  });

  describe('UPDATE_CART_ITEM_QUANTITY', () => {
    it('should update grocery item quantity in cartItems', () => {
      const action = {
        type: types.UPDATE_CART_ITEM_QUANTITY,
        cartItem: { ...mockCartItems[0], quantity: 1 }
      };

      const newState = cartReducer({
        ...initialCartItems,
        cartItems: [mockCartItems[0]]
      }, action);

      expect(newState.cartItems[0].quantity).toBe(1);
    });
  });

  describe('CHECKING_OUT', () => {
    it('should update checkingOut status', () => {
      const action = {
        type: types.CHECKING_OUT,
        isCheckingOut: true
      };

      const newState = cartReducer(initialCartItems, action);
      expect(newState.checkingOut).toBe(true);
    });
  });

  describe('CHECKOUT_SUCCESS', () => {
    it('should update checkoutStatus state in store', () => {
      const action = {
        type: types.CHECKOUT_SUCCESS,
        checkoutStatus: mockCheckoutStatus
      };

      const newState = cartReducer(initialCartItems, action);
      expect(newState.checkoutStatus.length).toBe(3);
    });
  });

  describe('CLEAR_GROCERY_CART', () => {
    it('should remove all cartItems and checkoutStatus items', () => {
      const action = { type: types.CLEAR_GROCERY_CART };

      const newState = cartReducer(initialCartItems, action);
      expect(newState.checkoutStatus.length).toBe(0);
      expect(newState.cartItems.length).toBe(0);
    });
  });
});
