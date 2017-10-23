import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import reducer from './reducers';
import Routes from './pages/routes';

const history = createHistory();
const middleware = [routerMiddleware(history), thunk];
// if (process.env.NODE_ENV === 'development') {
//   middleware.push(logger);
// }

const store = createStore(reducer, autoRehydrate(), applyMiddleware(...middleware));
persistStore(store, {
  blacklist: ['route'],
});

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default App;
