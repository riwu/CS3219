import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import logger from 'redux-logger';
import reducer from './reducers';
import Routes from './pages/routes';

const history = createHistory();
const middleware = [routerMiddleware(history), logger];
const store = createStore(reducer, autoRehydrate(), applyMiddleware(...middleware));
persistStore(store);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default App;
