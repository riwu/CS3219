import api from './api';

export const setTopCount = count => ({
  type: 'SET_TOP_COUNT',
  count,
});

export const setTopType = topType => ({
  type: 'SET_TOP_TYPE',
  topType,
});

export const setTopVenue = venue => ({
  type: 'SET_TOP_VENUE',
  venue,
});

export const getTopStats = topStats => (dispatch) => {
  api.getTopStats(topStats).then((data) => {
    dispatch({
      type: 'SET_TOP_DATA',
      data,
    });
  });
};
