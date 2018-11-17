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

const fetchGroceries = () => (dispatch) => {
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

export default fetchGroceries;
