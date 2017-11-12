import api from './api';

export const getVenues = () => (dispatch) => {
  api.getVenues().then((venues) => {
    dispatch({
      type: 'RECEIVE_VENUES',
      venues,
    });
  });
};

export const setTopValue = (field, value) => ({
  type: 'SET_TOP_VALUE',
  field,
  value,
});

export const getTopStats = params => (dispatch) => {
  api.getTopStats(params).then((data) => {
    dispatch({
      type: 'SET_TOP_DATA',
      data,
    });
  });
};

export const setImpactValue = (field, value) => ({
  type: 'SET_IMPACT_VALUE',
  field,
  value,
});

export const getImpactStats = queries => (dispatch) => {
  api.getImpactStats(queries).then((data) => {
    dispatch({
      type: 'SET_IMPACT_DATA',
      data,
    });
  });
};

export const setTrendValue = (field, value) => ({
  type: 'SET_TREND_VALUE',
  field,
  value,
});

export const getTrendStats = venueQueries => (dispatch) => {
  api.getTrendStats(venueQueries).then((data) => {
    dispatch({
      type: 'SET_TREND_DATA',
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
  }).catch(() => {
    dispatch({
      type: 'SET_CITATION_DATA',
      data: {},
    });
  });
};

export const setCitationDepth = depth => ({
  type: 'SET_CITATION_DEPTH',
  depth,
});
