const topType = (state = 'Authors', action) => {
  switch (action.type) {
    case 'SET_TOP_TYPE':
      return action.topType;
    default:
      return state;
  }
};

export default topType;
