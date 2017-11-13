import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';
import reducer from './reducers';
import Routes from './pages/routes';
import { getVenues } from './actions';

const history = createHistory();
const middleware = [routerMiddleware(history), thunk];

const config = {
  key: 'root',
  blacklist: ['route', 'titles'],
  storage,
};
const persistedReducer = persistReducer(config, reducer);

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

const persistor = persistStore(store);

store.dispatch(getVenues());
// store.dispatch(getTitles());

const App = () => (
  <Provider store={store}>
    <PersistGate
      persistor={persistor}
    >
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default App;
