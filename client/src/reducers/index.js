import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topStats from './topStats';
import impactFactor from './impactFactor';
import compareTrends from './compareTrends';
import citationWeb from './citationWeb';
import venues from './venues';

const reducer = combineReducers({
  route: routerReducer,
  topStats,
  impactFactor,
  compareTrends,
  citationWeb,
  venues,
});

export default reducer;
