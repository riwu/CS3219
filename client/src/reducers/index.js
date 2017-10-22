import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topStats from './topStats';
import trends from './trends';
import topVenues from './topVenues';

const reducer = combineReducers({
  route: routerReducer,
  topStats,
  trends,
  topVenues,
});

export default reducer;
