import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topStats from './topStats';

const reducer = combineReducers({
  route: routerReducer,
  topStats,
});

export default reducer;
