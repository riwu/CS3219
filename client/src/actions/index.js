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
  dispatch({
    type: 'SET_FETCHING',
    isFetching: true,
  });
  api.getTopStats(params).then((data) => {
    dispatch({
      type: 'SET_TOP_DATA',
      data,
    });
    dispatch({
      type: 'SET_FETCHING',
      isFetching: false,
    });
  });
};

export const setImpactValue = (field, value) => ({
  type: 'SET_IMPACT_VALUE',
  field,
  value,
});

export const getImpactStats = queries => (dispatch) => {
  dispatch({
    type: 'SET_FETCHING',
    isFetching: true,
  });
  api.getImpactStats(queries).then((data) => {
    dispatch({
      type: 'SET_IMPACT_DATA',
      data,
    });
    dispatch({
      type: 'SET_FETCHING',
      isFetching: false,
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
  dispatch({
    type: 'SET_FETCHING',
    isFetching: true,
  });
  api.getTrendStats(venueQueries).then((data) => {
    dispatch({
      type: 'SET_TREND_DATA',
      data,
    });
    dispatch({
      type: 'SET_FETCHING',
      isFetching: false,
    });
  });
};

export const setCitationValue = (field, value) => ({
  type: 'SET_CITATION_VALUE',
  field,
  value,
});

export const getCitationWeb = paper => (dispatch) => {
  dispatch({
    type: 'SET_FETCHING',
    isFetching: true,
  });
  api
    .getCitationWeb(paper)
    .then((data) => {
      dispatch({
        type: 'SET_CITATION_DATA',
        data,
      });
      dispatch({
        type: 'SET_FETCHING',
        isFetching: false,
      });
    })
    .catch(() => {
      dispatch({
        type: 'SET_CITATION_DATA',
        data: {},
      });
      dispatch({
        type: 'SET_FETCHING',
        isFetching: false,
      });
    });
};
