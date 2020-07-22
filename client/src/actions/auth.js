import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
  GET_USER_BY_ID,
  GET_USER_BY_ID_FAIL,
} from "./type";
import { setAlert } from "../actions/alert";
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    console.log("hi");
  }
  try {
    const res = await axios.get("/api/auth/");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch({ type: AUTH_ERROR });
  }
};

export const getUserById = (id) => async (dispatch) => {
  console.log("id:" + id);
  try {
    const res = await axios.get(`/api/user/${id}`);
    console.log(res);
    dispatch({ type: GET_USER_BY_ID, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_USER_BY_ID_FAIL });
  }
};
export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);
    console.log(res);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
    dispatch(setAlert("Logged In Successfully", "success"));
  } catch (err) {
    console.log(err.response);
    err.response.data.errors.map((error) =>
      dispatch(setAlert(error.msg, "danger"))
    );
    dispatch({ type: LOGIN_FAIL });
  }
};

export const registerUser = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/user", body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
    dispatch(setAlert("Successfully Registered", "success"));
  } catch (err) {
    console.log(err);
    dispatch({ type: REGISTER_FAIL });
    err.response.data.errors.map((error) =>
      dispatch(setAlert(error.msg, "danger"))
    );
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
