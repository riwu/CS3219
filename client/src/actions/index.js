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

export const setVenueCount = count => ({
  type: 'SET_VENUE_COUNT',
  count,
});

export const setVenueYear = year => ({
  type: 'SET_VENUE_YEAR',
  year,
});

export const getTopVenues = venueQueries => (dispatch) => {
  api.getTopVenues(venueQueries).then((data) => {
    dispatch({
      type: 'SET_VENUE_DATA',
      data,
    });
  });
};

export const setCitationPaper = paper => ({
  type: 'SET_CITATION_PAPER',
  paper,
});

export const getCitationWeb = paper => (dispatch) => {
  api.getCitationWeb(paper).then((data) => {
    dispatch({
      type: 'SET_CITATION_DATA',
      data,
    });
  });
};
