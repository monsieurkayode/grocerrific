import * as types from '../actions/actionTypes';
import { initialGroceries } from './initialState';

export default (state = initialGroceries, action) => {
  switch (action.type) {
    case types.FETCH_GROCERIES_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case types.FETCH_GROCERIES_SUCCESS:
      return {
        ...state,
        groceries: action.groceries
      };
    case types.ADDING_GROCERY_ITEM:
      return {
        ...state,
        isAdding: action.isAdding
      };
    case types.ADD_GROCERY_ITEM_SUCCESS:
      return {
        ...state,
        groceries: [
          ...action.grocery,
          ...state.groceries.slice(0, state.groceries.length - 1),
        ]
      };
    case types.ADD_GROCERY_ITEM_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          ...action.error
        }
      };
    case types.SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
