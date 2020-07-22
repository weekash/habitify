import {
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  GET_USER_BY_ID,
  GET_USER_BY_ID_FAIL,
} from "../actions/type";
const initialState = {
  loading: true,
  user: null,
  isAuthenticated: false,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        user: payload,
        isAuthenticated: true,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
    case GET_USER_BY_ID_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
