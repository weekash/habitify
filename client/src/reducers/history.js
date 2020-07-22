import { GET_ALL_HISTORY, GET_ALL_HISTORY_FAIL } from "../actions/type";
const initialState = {
  loading: true,
  history: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_HISTORY:
      return {
        loading: false,
        history: payload,
      };
    case GET_ALL_HISTORY_FAIL:
      return {
        loading: false,
        history: [],
      };
    default:
      return state;
  }
}
