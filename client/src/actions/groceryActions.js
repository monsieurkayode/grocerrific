import axios from 'axios';
import * as types from './actionTypes';
import { toastSuccess } from '../helpers/toaster';

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

export const fetchGroceries = () => async (dispatch) => {
  dispatch(fetchGroceriesLoading(true));

  try {
    const response = await axios.get(baseUrl);
    const { groceries } = response.data;
    dispatch(fetchGroceriesSuccess(groceries));
    dispatch(fetchGroceriesLoading(false));
  } catch (error) {
    const { data } = error.response;
    dispatch(fetchGroceriesFailure(data));
    dispatch(fetchGroceriesLoading(false));
  }
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

const addingGroceryItem = isAdding => ({
  type: types.ADDING_GROCERY_ITEM,
  isAdding
});

const addGroceryItemFailure = error => ({
  type: types.ADD_GROCERY_ITEM_FAILURE,
  error
});

const addGroceryItemSuccess = grocery => ({
  type: types.ADD_GROCERY_ITEM_SUCCESS,
  grocery
});

export const setError = error => dispatch => dispatch({
  type: types.SET_ERROR,
  error
});

export const addGroceryItem = formData => async (dispatch) => {
  dispatch(addingGroceryItem(true));

  try {
    const response = await axios.post(baseUrl, formData);
    const { grocery, message } = response.data;
    dispatch(addGroceryItemSuccess(grocery));
    dispatch(addingGroceryItem(false));
    toastSuccess(message);
  } catch (error) {
    const { data } = error.response;
    dispatch(addGroceryItemFailure(data));
    dispatch(addingGroceryItem(false));
  }
};

const updateGroceryItemFailure = error => ({
  type: types.UPDATE_GROCERY_ITEM_FAILURE,
  error
});

const updateGroceryItemSucces = grocery => ({
  type: types.UPDATE_GROCERY_ITEM_SUCCESS,
  grocery
});

export const updateGroceryItem = formData => async (dispatch) => {
  dispatch(addingGroceryItem(true));

  try {
    const response = await axios.patch(`${baseUrl}/${formData.id}`, formData);
    const { grocery, message } = response.data;
    dispatch(updateGroceryItemSucces(grocery));
    dispatch(addingGroceryItem(false));
    toastSuccess(message);
  } catch (error) {
    const { data } = error.response;
    dispatch(updateGroceryItemFailure(data));
    dispatch(addingGroceryItem(false));
  }
};
