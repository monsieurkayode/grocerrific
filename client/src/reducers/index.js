import { combineReducers } from 'redux';
import groceryReducer from './groceryReducer';

const rootReducer = combineReducers({
  allGroceries: groceryReducer
});

export default rootReducer;
