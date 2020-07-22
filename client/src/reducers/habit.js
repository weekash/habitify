import {
  GET_ALL_HABITS,
  GET_ALL_HABITS_FAILED,
  GET_HABIT_BY_ID,
  GET_HABIT_BY_ID_FAIL,
  DELETE_HABIT,
  DELETE_HABIT_FAIL,
} from "../actions/type";
const initialState = {
  loading: true,
  habits: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_HABITS:
    case GET_HABIT_BY_ID:
      return {
        ...state,
        loading: false,
        habits: payload,
      };
    case DELETE_HABIT:
      return {
        ...state,
        loading: false,
        habits: state.habits.filter((habit) => habit._id !== payload),
      };

    case GET_ALL_HABITS_FAILED:
    case GET_HABIT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        habits: [],
      };
    case DELETE_HABIT_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
