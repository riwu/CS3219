export const conflicts = {
  Papers: ['Number of papers', 'Number of venues'],
  Authors: ['Number of authors'],
  Venues: ['Number of venues'],
};

const initialState = {
  count: '10',
  aggregator: 'Venues',
  metric: 'Number of papers',
  venue: null,
  paper: '',
  author: '',
  data: null,
  chart: 'Bar Chart',
};

const hiddenFields = {
  Authors: 'author',
  Venues: 'venue',
  Papers: 'paper',
};

const topStats = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOP_VALUE': {
      const newState = {
        ...state,
        [action.field]: action.value,
      };
      if (action.field === 'aggregator') {
        if ((conflicts[newState.aggregator] || []).includes(newState.metric)) {
          newState.metric = 'Citations made';
        }
        newState[hiddenFields[action.value]] = '';
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
