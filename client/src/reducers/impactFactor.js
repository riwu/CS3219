const initialState = {
  count: 10,
  year: 2014,
  data: [],
  chart: 'Pie Chart',
};

const impactFactor = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IMPACT_VALUE':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_IMPACT_DATA':
      return {
        ...state,
        title: state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default impactFactor;
