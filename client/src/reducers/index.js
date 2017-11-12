import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topStats from './topStats';
import impactFactor from './impactFactor';
import topVenues from './topVenues';
import citationWeb from './citationWeb';

const reducer = combineReducers({
  route: routerReducer,
  topStats,
  impactFactor,
  topVenues,
  citationWeb,
});

export default reducer;
