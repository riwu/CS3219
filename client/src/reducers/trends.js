const initialState = {
  type: 'Publications',
  venue: 'ICSE',
  data: null,
  chart: 'Line Chart',
};

const trends = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TREND_TYPE':
      return {
        ...state,
        type: action.topType,
      };
    case 'SET_TREND_VENUE':
      return {
        ...state,
        venue: action.venue,
      };
    case 'SET_TREND_DATA':
      return {
        ...state,
        title: state,
        data: action.data,
      };
    case 'SET_TREND_CHART':
      return {
        ...state,
        chart: action.chart,
      };
    default:
      return state;
  }
};

export default trends;
