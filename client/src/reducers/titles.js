const titles = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_TITLES':
      return action.titles;
    default:
      return state;
  }
};

export default titles;
