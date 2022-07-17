import { LOGIN, LOGOUT, GET_USER } from '../actionTypes';

export const login = (user) => ({
  type: LOGIN,
  payload: {
    user,
  },
});
export const logout = () => ({
  type: LOGOUT,
  payload: {
    user: undefined,
  },
});
export const getUser = () => ({
  type: GET_USER,
});
