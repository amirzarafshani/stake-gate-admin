import { LOGIN, LOGOUT } from '../actionTypes';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  user: user ? user : undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const { user } = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        user,
      };
    }
    case LOGOUT: {
      localStorage.removeItem('user');
      return {
        ...state,
        user: undefined,
      };
    }
    default:
      return state;
  }
}
