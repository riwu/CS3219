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

export const getTopStats = topQueries => (dispatch) => {
  api.getTopStats(topQueries).then((data) => {
    dispatch({
      type: 'SET_TOP_DATA',
      data,
    });
  });
};

export const setTrendType = topType => ({
  type: 'SET_TREND_TYPE',
  topType,
});

export const setTrendVenue = venue => ({
  type: 'SET_TREND_VENUE',
  venue,
});

export const getTrendStats = trendQueries => (dispatch) => {
  api.getTrendStats(trendQueries).then((data) => {
    dispatch({
      type: 'SET_TREND_DATA',
      data,
    });
  });
};
