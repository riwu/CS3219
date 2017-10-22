import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
  route: routerReducer,
});

export default reducer;
