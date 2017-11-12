const venues = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_VENUES':
      return action.venues;
    default:
      return state;
  }
};

export default venues;
