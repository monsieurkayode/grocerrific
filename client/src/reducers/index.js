import { combineReducers } from 'redux';
import groceryReducer from './groceryReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  allGroceries: groceryReducer,
  allCartItems: cartReducer
});

export default rootReducer;
