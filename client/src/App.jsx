import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import reducer from './reducers';
import Routes from './pages/routes';
import { getVenues, getTitles } from './actions';

const history = createHistory();
const middleware = [routerMiddleware(history), thunk];

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware), autoRehydrate()),
);
persistStore(store, {
  blacklist: ['route'],
});

store.dispatch(getVenues());
store.dispatch(getTitles());

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default App;
