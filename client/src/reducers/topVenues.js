const initialState = {
  count: 10,
  year: 2015,
  data: null,
  chart: 'Pie Chart',
};

const topVenues = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VENUE_YEAR':
      return {
        ...state,
        year: action.year,
      };
    case 'SET_VENUE_COUNT':
      return {
        ...state,
        count: action.count,
      };
    case 'SET_VENUE_DATA':
      return {
        ...state,
        data: action.data,
      };
    case 'SET_VENUE_CHART':
      return {
        ...state,
        chart: action.chart,
      };
    default:
      return state;
  }
};

export default topVenues;
