import axios from 'axios';
import * as types from './actionTypes';
import { toastSuccess, toastError } from '../helpers/toaster';

export const addGroceryToCart = grocery => dispatch => dispatch({
  type: types.ADD_GROCERY_TO_CART,
  grocery
});

export const removeGroceryFromCart = id => dispatch => dispatch({
  type: types.REMOVE_GROCERY_FROM_CART,
  id
});

export const updateCartItemQuantity = cartItem => dispatch => dispatch({
  type: types.UPDATE_CART_ITEM_QUANTITY,
  cartItem
});

const checkingOut = isCheckingOut => ({
  type: types.CHECKING_OUT,
  isCheckingOut
});

const checkoutFailure = error => ({
  type: types.CHECKOUT_FAILURE,
  error
});

const checkoutSuccess = checkoutStatus => ({
  type: types.CHECKOUT_SUCCESS,
  checkoutStatus
});

export const checkout = cart => async (dispatch) => {
  dispatch(checkingOut(true));

  try {
    const response = await axios.patch('/api/v1/checkout', { cart });
    const { checkoutStatus } = response.data;
    dispatch(checkoutSuccess(checkoutStatus));
    dispatch(checkingOut(false));
    toastSuccess('Your order has been processed');
  } catch (error) {
    const { data } = error.response;
    dispatch(checkoutFailure(data));
    dispatch(checkingOut(false));
    toastError(data);
  }
};

export const clearGroceryCart = () => dispatch => dispatch({
  type: types.CLEAR_GROCERY_CART
});
