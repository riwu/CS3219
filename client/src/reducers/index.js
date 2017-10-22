import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topStats from './topStats';
import trends from './trends';

const reducer = combineReducers({
  route: routerReducer,
  topStats,
  trends,
});

export default reducer;
