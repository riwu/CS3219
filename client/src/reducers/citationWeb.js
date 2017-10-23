const initialState = {
  paper: 'Low-density parity check codes over GF(q)',
  data: null,
  depth: 2,
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
        title: state,
        data: action.data,
      };
    case 'SET_CITATION_DEPTH':
      return {
        ...state,
        depth: action.depth,
      };
    default:
      return state;
  }
};

export default citationWeb;
