/* eslint-disable no-underscore-dangle */
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/actionTypes';
import {
  baseUrl,
  fetchGroceries,
  setError,
  addGroceryItem,
  updateGroceryItem,
  deleteGroceryItem
} from '../../actions/groceryActions';
import mockCheckoutStatus from '../__mocks__/mockCheckoutStatus';
import mockCartItems from '../__mocks__/mockCartItems';
import mockGroceries from '../__mocks__/mockGroceries';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Grocery Actions', () => {
  describe('fetchGroceries', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('creates FETCH_GROCERIES_LOADING and FETCH_GROCERIES_SUCCESS',
      async (done) => {
        moxios.stubRequest(baseUrl, {
          status: 200,
          response: {
            groceries: mockGroceries
          }
        });

        const expectedActions = [
          {
            type: types.FETCH_GROCERIES_LOADING,
            isLoading: true
          },
          {
            type: types.FETCH_GROCERIES_SUCCESS,
            groceries: mockGroceries
          },
          {
            type: types.FETCH_GROCERIES_LOADING,
            isLoading: false
          }
        ];

        const store = mockStore({});

        await store.dispatch(fetchGroceries())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('creates FETCH_GROCERIES_LOADING and FETCH_GROCERIES_FAILURE',
      async (done) => {
        moxios.stubRequest(baseUrl, {
          status: 400,
          response: {
            status: 'Bad Request'
          }
        });

        const expectedActions = [
          {
            type: types.FETCH_GROCERIES_LOADING,
            isLoading: true
          },
          {
            type: types.FETCH_GROCERIES_FAILURE,
            error: { status: 'Bad Request' }
          },
          {
            type: types.FETCH_GROCERIES_LOADING,
            isLoading: false
          }
        ];

        const store = mockStore({});

        await store.dispatch(fetchGroceries())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });

  describe('setError', () => {
    it('creates SET_ERROR', (done) => {
      const expectedActions = [
        {
          type: types.SET_ERROR,
          error: {}
        }
      ];

      const store = mockStore({});

      store.dispatch(setError({}));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('addGroceryItem', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('creates ADDING_GROCERY_ITEM and ADD_GROCERY_ITEM_SUCCESS',
      async (done) => {
        moxios.stubRequest(baseUrl, {
          status: 200,
          response: {
            grocery: mockGroceries[0]
          }
        });

        const expectedActions = [
          {
            type: types.ADDING_GROCERY_ITEM,
            isAdding: true
          },
          {
            type: types.ADD_GROCERY_ITEM_SUCCESS,
            grocery: mockGroceries[0]
          },
          {
            type: types.ADDING_GROCERY_ITEM,
            isAdding: false
          }
        ];

        const store = mockStore({});

        await store.dispatch(addGroceryItem(mockGroceries[0]))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('creates ADDING_GROCERY_ITEM and ADD_GROCERY_ITEM_SUCCESS',
      async (done) => {
        moxios.stubRequest(baseUrl, {
          status: 400,
          response: {
            status: 'Bad Request'
          }
        });

        const expectedActions = [
          {
            type: types.ADDING_GROCERY_ITEM,
            isAdding: true
          },
          {
            type: types.ADD_GROCERY_ITEM_FAILURE,
            error: { status: 'Bad Request' }
          },
          {
            type: types.ADDING_GROCERY_ITEM,
            isAdding: false
          }
        ];

        const store = mockStore({});

        await store.dispatch(addGroceryItem(mockGroceries[0]))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });

  describe('updateGroceryItem', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('creates ADDING_GROCERY_ITEM and UPDATE_GROCERY_ITEM_SUCCESS',
      async (done) => {
        moxios.stubRequest(`${baseUrl}/${mockGroceries[0]._id}`, {
          status: 200,
          response: {
            grocery: mockGroceries[0],
            message: 'Updated grocery'
          }
        });

        const expectedActions = [
          {
            type: types.ADDING_GROCERY_ITEM,
            isAdding: true
          },
          {
            type: types.UPDATE_GROCERY_ITEM_SUCCESS,
            grocery: mockGroceries[0]
          },
          {
            type: types.ADDING_GROCERY_ITEM,
            isAdding: false
          }
        ];

        const store = mockStore({});

        await store.dispatch(updateGroceryItem({
          ...mockGroceries[0],
          id: mockGroceries[0]._id
        }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('creates ADDING_GROCERY_ITEM and UPDATE_GROCERY_ITEM_FAILURE',
      async (done) => {
        moxios.stubRequest(`${baseUrl}/${mockGroceries[0]._id}`, {
          status: 400,
          response: {
            status: 'Bad Request'
          }
        });

        const expectedActions = [
          {
            type: types.ADDING_GROCERY_ITEM,
            isAdding: true
          },
          {
            type: types.UPDATE_GROCERY_ITEM_FAILURE,
            error: { status: 'Bad Request' }
          },
          {
            type: types.ADDING_GROCERY_ITEM,
            isAdding: false
          }
        ];

        const store = mockStore({});

        await store.dispatch(updateGroceryItem({
          ...mockGroceries[0],
          id: mockGroceries[0]._id
        }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });

  describe('deleteGroceryItem', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('creates DELETING_GROCERY_ITEM and DELETE_GROCERY_ITEM_SUCCESS',
      async (done) => {
        moxios.stubRequest(`${baseUrl}/${mockGroceries[0]._id}`, {
          status: 200,
          response: {
            message: 'Deleted grocery'
          }
        });

        const expectedActions = [
          {
            type: types.DELETING_GROCERY_ITEM,
            isDeleting: true
          },
          {
            type: types.DELETE_GROCERY_ITEM_SUCCESS,
            id: mockGroceries[0]._id
          },
          {
            type: types.DELETING_GROCERY_ITEM,
            isDeleting: false
          }
        ];

        const store = mockStore({});

        await store.dispatch(deleteGroceryItem(mockGroceries[0]._id))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('creates DELETING_GROCERY_ITEM and DELETE_GROCERY_ITEM_FAILURE',
      async (done) => {
        moxios.stubRequest(`${baseUrl}/${mockGroceries[0]._id}`, {
          status: 400,
          response: { message: 'Bad Request' }
        });

        const expectedActions = [
          {
            type: types.DELETING_GROCERY_ITEM,
            isDeleting: true
          },
          {
            type: types.DELETE_GROCERY_ITEM_FAILURE,
            error: { message: 'Bad Request' }
          },
          {
            type: types.DELETING_GROCERY_ITEM,
            isDeleting: false
          }
        ];

        const store = mockStore({});

        await store.dispatch(deleteGroceryItem(mockGroceries[0]._id))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });
});
