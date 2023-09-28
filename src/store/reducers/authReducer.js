import { SET_USER, CLEAR_USER } from '../actionTypes/authActionTypes';

const initialState = {
  user: null,
  // Other state properties...
};

const authReducer = (state = initialState, action) => {
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

export default authReducer;


