import api from './api';

export const getVenues = () => (dispatch) => {
  api.getVenues().then((venues) => {
    dispatch({
      type: 'RECEIVE_VENUES',
      venues,
    });
  });
};

export const getTitles = () => (dispatch) => {
  api.getTitles().then((titles) => {
    dispatch({
      type: 'RECEIVE_TITLES',
      titles,
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

export const setTrendRowValue = (column, index, value) => ({
  type: 'SET_TREND_ROW_VALUE',
  column,
  index,
  value,
});

export const removeTrendRow = index => ({
  type: 'REMOVE_TREND_ROW',
  index,
});

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
