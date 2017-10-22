const topInput = (state = 10, action) => {
  switch (action.type) {
    case 'SET_TOP_INPUT':
      return action.value;
    default:
      return state;
  }
};

export default topInput;
