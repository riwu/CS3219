const initialState = {
  count: '10',
  aggregator: 'Authors',
  metric: 'Number of papers',
  venue: '',
  paper: '',
  author: '',
  data: [],
  chart: 'Bar Chart',
};

const conflicts = {
  Papers: 'Number of papers',
  Authors: 'Number of authors',
  Venues: 'Number of venues',
};

const topStats = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOP_VALUE': {
      const newState = {
        ...state,
        [action.field]: action.value,
      };
      if (conflicts[newState.aggregator] === newState.metric) {
        newState.metric = 'Citations made';
      }
      return newState;
    }

    case 'SET_TOP_DATA':
      return {
        ...state,
        data: action.data,
        title: state,
      };
    default:
      return state;
  }
};

export default topStats;
