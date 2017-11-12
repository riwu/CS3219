const initialState = {
  count: 10,
  startYear: 2000,
  endYear: 2017,
  data: null,
  chart: 'Pie Chart',
};

const compareTrends = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TREND_VALUE':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_TREND_DATA':
      return {
        ...state,
        title: state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default compareTrends;
