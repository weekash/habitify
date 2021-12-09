import axios from "axios";
import {
  GET_ALL_HABITS_FAILED,
  GET_ALL_HABITS,
  CHECK_IN_FAIL,
  CHECK_IN_SUCCESS,
  ADD_REWARDS,
  ADD_REWARDS_FAIL,
  GET_HABIT_BY_ID,
  GET_HABIT_BY_ID_FAIL,
  DELETE_HABIT,
  DELETE_HABIT_FAIL,
} from "./type";
import { setAlert } from "./alert";
import { getUserById } from "./auth";
export const getAllHabits = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/habit");

    dispatch({ type: GET_ALL_HABITS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_ALL_HABITS_FAILED });
  }
};

export const getUncheckedHabits = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/habit/unchecked");

    dispatch({ type: GET_ALL_HABITS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_ALL_HABITS_FAILED });
  }
};

export const getHabitAndUserById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/habit/${id}`);

    await dispatch(getUserById(res.data.user));
    await dispatch({ type: GET_HABIT_BY_ID, payload: res.data });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: GET_HABIT_BY_ID_FAIL });
  }
};

export const addHabit = (name, duration) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, duration });
  try {
    const res = await axios.post("/api/habit/add", body, config);
    dispatch(setAlert("Habit added successfully", "success"));
  } catch (err) {
    console.log("you are here");
    console.log(err.response);
    err.response.data.errors.forEach((error) =>
      dispatch(setAlert(error.msg, "danger"))
    );
  }
};

export const checkHabit = (id, message, checkInDate) => async (dispatch) => {
  message = `You have checked in and your experience was "${message}"`;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ message, checkInDate });
    await axios.post(`/api/habit/check/${id}`, body, config);
    dispatch({ type: CHECK_IN_SUCCESS });
    dispatch(setAlert("Great !!! Keep going", "success"));
  } catch (err) {
    console.log(err.response.data);
    dispatch({ type: CHECK_IN_FAIL });
  }
};

const setStorage = (id) => {
  localStorage.setItem("done", id);
  setTimeout(remove(), 5000);
};
const remove = () => {
  localStorage.removeItem("done");
};
export const addReward = (id, reward) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ id, reward });
    await axios.post("/api/user/addreward", body, config);
    dispatch({ type: ADD_REWARDS });
  } catch (err) {
    console.log(err);
    dispatch({ type: ADD_REWARDS_FAIL });
  }
};

export const deleteHabit = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/habit/delete/${id}`);
    dispatch({ type: DELETE_HABIT, payload: id });
  } catch (err) {
    console.log(err);
    dispatch({ type: DELETE_HABIT_FAIL });
  }
};
