import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';

import reducer from './reducers';

import Routes from './routes';

const history = createHistory();
const middleware = [routerMiddleware(history)];
const store = createStore(reducer, applyMiddleware(...middleware));

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default App;
