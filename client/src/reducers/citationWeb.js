const initialState = {
  paper: 'Low-density parity check codes over GF(q)',
  data: null,
};

const citationWeb = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CITATION_PAPER':
      return {
        ...state,
        paper: action.paper,
      };
    case 'SET_CITATION_DATA':
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default citationWeb;
