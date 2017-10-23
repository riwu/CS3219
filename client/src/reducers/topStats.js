const initialState = {
  count: '10',
  type: 'Authors',
  venue: 'ArXiv',
  data: null,
  chart: 'Bar Chart',
};

const topStats = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOP_COUNT':
      return {
        ...state,
        count: action.count,
      };
    case 'SET_TOP_TYPE':
      return {
        ...state,
        type: action.topType,
      };
    case 'SET_TOP_VENUE':
      return {
        ...state,
        venue: action.venue,
      };
    case 'SET_TOP_DATA':
      return {
        ...state,
        data: action.data,
        title: state,
      };
    case 'SET_TOP_CHART':
      return {
        ...state,
        chart: action.chart,
      };
    default:
      return state;
  }
};

export default topStats;
