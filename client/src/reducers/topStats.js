const initialState = {
  count: '10',
  aggregator: 'Authors',
  metric: 'Number of papers',
  venue: '',
  paper: '',
  author: '',
  data: null,
  chart: 'Bar Chart',
};

const topStats = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOP_Value':
      return {
        ...state,
        [action.field]: action.value,
      };
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
