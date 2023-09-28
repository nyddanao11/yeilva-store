import { SET_USER, CLEAR_USER } from '../actionTypes/userActionTypes';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    // Handle other actions as needed
    default:
      return state;
  }
};

export default userReducer;







