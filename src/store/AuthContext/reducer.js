export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  DROP_USER: "DROP_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.DROP_USER:
      return {
        ...state,
        user: null,
      };

    default:
      break;
  }
};

export default reducer;
