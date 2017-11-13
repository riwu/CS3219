const initialState = {
  conferences: [
    ['ArXiv', '2010'],
    ['PloS one', '2011'],
    ['PloS one', '2008'],
    ['', ''],
  ],
  startYear: '2000',
  endYear: '2014',
  data: null,
  chart: 'Line Chart',
  filterConference: null,
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
      if (action.index === conferences.length - 1 && action.value) {
        conferences.push(['', '']);
      } else if (action.index === conferences.length - 2) {
        if (row.every(field => field.trim() === '')) {
          conferences.pop();
        }
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
