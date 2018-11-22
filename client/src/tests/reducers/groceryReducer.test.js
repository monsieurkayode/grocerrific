/* eslint-disable no-underscore-dangle */
import * as types from '../../actions/actionTypes';
import groceryReducer from '../../reducers/groceryReducer';
import { initialGroceries } from '../../reducers/initialState';
import mockGroceries from '../__mocks__/mockGroceries';

describe('Grocery Reducer', () => {
  it('returns initial state', () => {
    expect(groceryReducer(undefined, {})).toEqual(initialGroceries);
  });

  describe('FETCH_GROCERIES_LOADING', () => {
    it('should set the isLoading state in store', () => {
      const action = { type: types.FETCH_GROCERIES_LOADING, isLoading: true };
      expect(groceryReducer(initialGroceries, action).isLoading).toBe(true);
    });
  });

  describe('ADDING_GROCERY_ITEM', () => {
    it('should set the makingAjaxRequest state in store', () => {
      const action = { type: types.ADDING_GROCERY_ITEM, isAdding: true };
      expect(groceryReducer(initialGroceries, action).makingAjaxRequest)
        .toBe(true);
    });
  });

  describe('DELETING_GROCERY_ITEM', () => {
    it('should set the makingAjaxRequest state in store', () => {
      const action = { type: types.DELETING_GROCERY_ITEM, isDeleting: true };
      expect(groceryReducer(initialGroceries, action).makingAjaxRequest)
        .toBe(true);
    });
  });

  describe('SET_ERROR', () => {
    it('should set the error state in store', () => {
      const action = { type: types.SET_ERROR, error: {} };
      expect(groceryReducer(initialGroceries, action).error).toEqual({});
    });
  });

  describe('FETCH_GROCERIES_SUCCESS', () => {
    it('should set add groceries to groceries state in store', () => {
      const action = {
        type: types.FETCH_GROCERIES_SUCCESS,
        groceries: mockGroceries
      };
      expect(groceryReducer(initialGroceries, action).groceries.length).toBe(3);
    });
  });

  describe('ADD_GROCERY_ITEM_SUCCESS', () => {
    it('should set add new grocery to groceries state in store', () => {
      const action = {
        type: types.ADD_GROCERY_ITEM_SUCCESS,
        grocery: mockGroceries[1]
      };
      expect(groceryReducer(initialGroceries, action).groceries.length).toBe(1);
    });
  });

  describe('ADD_GROCERY_ITEM_FAILURE', () => {
    it('should set error state in store', () => {
      const action = {
        type: types.ADD_GROCERY_ITEM_FAILURE,
        error: { status: 'fail' }
      };
      expect(groceryReducer(initialGroceries, action).error.status)
        .toBe('fail');
    });
  });

  describe('UPDATE_GROCERY_ITEM_SUCCESS', () => {
    it('should update grocery with new properties in store', () => {
      const action = {
        type: types.UPDATE_GROCERY_ITEM_SUCCESS,
        grocery: { ...mockGroceries[1], name: 'Tomato' }
      };
      expect(groceryReducer({
        ...initialGroceries, groceries: mockGroceries
      }, action).groceries[1].name).toEqual('Tomato');
    });
  });

  describe('UPDATE_GROCERY_ITEM_FAILURE', () => {
    it('should set error state in store', () => {
      const action = {
        type: types.UPDATE_GROCERY_ITEM_FAILURE,
        error: { status: 'fail' }
      };
      expect(groceryReducer(initialGroceries, action).error.status)
        .toEqual('fail');
    });
  });

  describe('DELETE_GROCERY_ITEM_FAILURE', () => {
    it('should set error state in store', () => {
      const action = {
        type: types.DELETE_GROCERY_ITEM_FAILURE,
        error: { status: 'fail' }
      };
      expect(groceryReducer(initialGroceries, action).error.status)
        .toEqual('fail');
    });
  });

  describe('DELETE_GROCERY_ITEM_SUCCESS', () => {
    it('should remove grocery in store', () => {
      const action = {
        type: types.DELETE_GROCERY_ITEM_SUCCESS,
        id: mockGroceries[0]._id
      };
      expect(groceryReducer({
        ...initialGroceries, groceries: mockGroceries
      }, action).groceries.length).toBe(2);
    });
  });
});
