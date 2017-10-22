import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topInput from './topInput';
import topType from './topType';

const reducer = combineReducers({
  route: routerReducer,
  topInput,
  topType,
});

export default reducer;
