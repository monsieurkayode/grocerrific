import axios from 'axios';
import * as types from './actionTypes';

const baseUrl = '/api/v1/groceries';

const fetchGroceriesLoading = isLoading => ({
  type: types.FETCH_GROCERIES_LOADING,
  isLoading
});

const fetchGroceriesFailure = error => ({
  type: types.FETCH_GROCERIES_FAILURE,
  error
});

const fetchGroceriesSuccess = groceries => ({
  type: types.FETCH_GROCERIES_SUCCESS,
  groceries
});

export const fetchGroceries = () => (dispatch) => {
  dispatch(fetchGroceriesLoading(true));

  return axios.get(baseUrl)
    .then((response) => {
      const { groceries } = response.data;
      dispatch(fetchGroceriesSuccess(groceries));
      dispatch(fetchGroceriesLoading(false));
    })
    .catch((error) => {
      dispatch(fetchGroceriesFailure(error));
      dispatch(fetchGroceriesLoading(false));
    });
};

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
