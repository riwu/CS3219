const initialState = {
  type: 'publications',
  venue: 'ArXiv',
  data: null,
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
        data: action.data,
      };
    default:
      return state;
  }
};

export default trends;
