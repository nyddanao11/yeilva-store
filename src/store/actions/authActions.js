// actions/authActions.js
export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const logout = () => ({
  type: 'LOGOUT',
});

// // actions/userActions.js
// export const setUser = (userData) => ({
//   type: 'SET_USER',
//   payload: userData,
// });

// export const clearUser = () => ({
//   type: 'CLEAR_USER',
// });


