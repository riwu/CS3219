const initialState = {
  conferences: [
    ['ArXiv', '2014'],
    ['', ''],
  ],
  startYear: '2000',
  endYear: '2017',
  data: [],
  chart: 'Pie Chart',
};

const compareTrends = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TREND_VALUE':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_TREND_ROW_VALUE': {
      const conferences = state.conferences.slice();
      const row = conferences[action.index].slice();
      row[action.column] = action.value;
      conferences[action.index] = row;
      if (action.index === conferences.length - 1) {
        conferences.push(['', '']);
      }
      return {
        ...state,
        conferences,
      };
    }
    case 'REMOVE_TREND_ROW': {
      const conferences = state.conferences.slice();
      conferences.splice(action.index, 1);
      return {
        ...state,
        conferences,
      };
    }
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
