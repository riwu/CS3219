import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topStats from './topStats';
import trends from './trends';
import topVenues from './topVenues';
import citationWeb from './citationWeb';

const reducer = combineReducers({
  route: routerReducer,
  topStats,
  trends,
  topVenues,
  citationWeb,
});

export default reducer;
