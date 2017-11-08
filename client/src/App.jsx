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

// Q1
const q1 = [
	{
	conference: 'X',
	year: '2012',
	citations: {
		2000: 1,
		2001: 2,
		2002: 4,
		2003: 9,
		2004: 3,
		2005: 3,
		2006: 3,
		2007: 5,
		2008: 7
	},
	{
	conference: 'X',
	year: '2013',
	citations: {
		2000: 1,
		2001: 2,
		2002: 4,
		2003: 6,
		2004: 7,
		2005: 2,
		2006: 4,
		2007: 6,
		2008: 2
	},
	{
	conference: 'X',
	year: '2014',
	citations: {
		2000: 3,
		2001: 5,
		2002: 7,
		2003: 8,
		2004: 9,
		2005: 4,
		2006: 2,
		2007: 4,
		2008: 6
	},
	{
	conference: 'X',
	year: '2015',
	citations: {
		2000: 5,
		2001: 3,
		2002: 1,
		2003: 5,
		2004: 7,
		2005: 4,
		2006: 3,
		2007: 4,
		2008: 4
	},
	{
	conference: 'X',
	year: '2016',
	citations: {
		2000: 2,
		2001: 3,
		2002: 5,
		2003: 6,
		2004: 7,
		2005: 8,
		2006: 8,
		2007: 3,
		2008: 5
	}
];



const q1_1 = [
	{
	conference: 'D',
	year: '2012',
	citations: {
		2000: 1,
		2001: 2,
		2002: 4,
		2003: 9,
		2004: 2,
		2005: 5,
		2006: 5,
		2007: 8,
		2008: 9
	},
	{
	conference: 'D',
	year: '2013',
	citations: {
		2000: 5,
		2001: 5,
		2002: 6,
		2003: 8,
		2004: 9,
		2005: 9,
		2006: 3,
		2007: 2,
		2008: 4
	},
	{
	conference: 'D',
	year: '2014',
	citations: {
		2000: 5,
		2001: 5,
		2002: 6,
		2003: 8,
		2004: 9,
		2005: 9,
		2006: 3,
		2007: 2,
		2008: 4
	},
	{
	conference: 'D',
	year: '2015',
	citations: {
		2000: 5,
		2001: 5,
		2002: 6,
		2003: 8,
		2004: 9,
		2005: 9,
		2006: 3,
		2007: 2,
		2008: 4
	},
	{
	conference: 'D',
	year: '2016',
	citations: {
		2000: 5,
		2001: 5,
		2002: 6,
		2003: 8,
		2004: 9,
		2005: 9,
		2006: 3,
		2007: 2,
		2008: 4
	}
];
/*

// Q1.1
const q1_1 = [
	{
		conference: 'D',
		subConference: 'ENPLL',
		citations: {
			2000: 7,
			2001: 5,
			2002: 3,
			2003: 4,
			2004: 5,
			2005: 6,
			2006: 6,
			2007: 2,
			2008: 2
		}
	},
	{
		conference: 'D',
		subConference: 'CONLL',
		citations: {
			2000: 1,
			2001: 2
		}
	}, 
	{
		conference: 'D',
		subConference: 'XASD',
		citations: {
			2000: 1,
			2001: 2
		}
	}
	];

	const q2 = [
	{
	conference: 'D',
	year: '2012',
	citations: {
		2000: 1,
		2001: 2
	},
	{
	conference: 'X',
	year: '2012',
	citations: {
		2000: 1,
		2001: 2
	}
];
*/