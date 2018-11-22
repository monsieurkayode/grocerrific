import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/actionTypes';
import {
  checkout,
  addGroceryToCart,
  removeGroceryFromCart,
  updateCartItemQuantity,
  clearGroceryCart
} from '../../actions/cartActions';
import mockCheckoutStatus from '../__mocks__/mockCheckoutStatus';
import mockCartItems from '../__mocks__/mockCartItems';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Cart Actions', () => {
  describe('checkout', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('creates CHECKING_OUT and CHECKOUT_SUCCESS', async (done) => {
      moxios.stubRequest('/api/v1/checkout', {
        status: 200,
        response: {
          checkoutStatus: mockCheckoutStatus
        }
      });

      const expectedActions = [
        {
          type: types.CHECKING_OUT,
          isCheckingOut: true
        },
        {
          type: types.CHECKOUT_SUCCESS,
          checkoutStatus: mockCheckoutStatus
        },
        {
          type: types.CHECKING_OUT,
          isCheckingOut: false
        }
      ];

      const store = mockStore({});

      await store.dispatch(checkout(mockCartItems))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('creates CHECKING_OUT and CHECKOUT_FAILURE', async (done) => {
      moxios.stubRequest('/api/v1/checkout', {
        status: 400,
        response: {
          status: 'Bad Request'
        }
      });

      const expectedActions = [
        {
          type: types.CHECKING_OUT,
          isCheckingOut: true
        },
        {
          type: types.CHECKOUT_FAILURE,
          error: { status: 'Bad Request' }
        },
        {
          type: types.CHECKING_OUT,
          isCheckingOut: false
        }
      ];

      const store = mockStore({});

      await store.dispatch(checkout(mockCartItems))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('addGroceryToCart', () => {
    it('creates ADD_GROCERY_TO_CART', (done) => {
      const expectedActions = [
        {
          type: types.ADD_GROCERY_TO_CART,
          grocery: mockCartItems[0]
        }
      ];

      const store = mockStore({});

      store.dispatch(addGroceryToCart(mockCartItems[0]));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('removeGroceryFromCart', () => {
    it('creates REMOVE_GROCERY_FROM_CART', (done) => {
      const expectedActions = [
        {
          type: types.REMOVE_GROCERY_FROM_CART,
          id: mockCartItems[0].id
        }
      ];

      const store = mockStore({});

      store.dispatch(removeGroceryFromCart(mockCartItems[0].id));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('updateCartItemQuantity', () => {
    it('creates UPDATE_CART_ITEM_QUANTITY', (done) => {
      const expectedActions = [
        {
          type: types.UPDATE_CART_ITEM_QUANTITY,
          cartItem: mockCartItems[0]
        }
      ];

      const store = mockStore({});

      store.dispatch(updateCartItemQuantity(mockCartItems[0]));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('clearGroceryCart', () => {
    it('creates CLEAR_GROCERY_CART', (done) => {
      const expectedActions = [
        {
          type: types.CLEAR_GROCERY_CART,
        }
      ];

      const store = mockStore({});

      store.dispatch(clearGroceryCart());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
