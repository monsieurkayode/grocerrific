/* eslint-disable no-underscore-dangle */
import * as types from '../actions/actionTypes';
import { initialCartItems } from './initialState';

export default (state = initialCartItems, action) => {
  switch (action.type) {
    case types.ADD_GROCERY_TO_CART:
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          action.grocery
        ]
      };
    case types.REMOVE_GROCERY_FROM_CART:
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter(item => item.id !== action.id)
        ]
      };
    case types.UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: [
          ...state.cartItems.slice(0,
            state.cartItems.findIndex(item => item.id === action.cartItem.id)),
          {
            ...state.cartItems.find(item => item.id === action.cartItem.id),
            quantity: action.cartItem.quantity
          },
          ...state.cartItems.slice(
            state.cartItems
              .findIndex(item => item.id === action.cartItem.id) + 1
          )
        ]
      };
    case types.CHECKING_OUT:
      return {
        ...state,
        checkingOut: action.isCheckingOut
      };
    case types.CHECKOUT_SUCCESS:
      return {
        ...state,
        checkoutStatus: action.checkoutStatus
      };
    case types.CLEAR_GROCERY_CART:
      return {
        ...state,
        checkoutStatus: [],
        cartItems: []
      };
    default:
      return state;
  }
};
