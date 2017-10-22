const initialState = {
  count: '10',
  type: 'Authors',
  venue: 'ArXiv',
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
    default:
      return state;
  }
};

export default topStats;
