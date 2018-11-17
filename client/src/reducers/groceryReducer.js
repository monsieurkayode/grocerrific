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
    default:
      return state;
  }
};
