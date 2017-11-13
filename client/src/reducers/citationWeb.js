const initialState = {
  paper: 'Low-density parity check codes over GF(q)',
  data: null,
  depth: 2,
};

const citationWeb = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CITATION_VALUE':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_CITATION_DATA':
      return {
        ...state,
        title: state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default citationWeb;
