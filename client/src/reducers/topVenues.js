const initialState = {
  count: 10,
  year: 2015,
  data: null,
};

const topVenues = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VENUE_YEAR':
      return {
        ...state,
        type: action.year,
      };
    case 'SET_VENUE_COUNT':
      return {
        ...state,
        venue: action.count,
      };
    case 'SET_VENUE_DATA':
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default topVenues;
