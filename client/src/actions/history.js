import { GET_ALL_HISTORY, GET_ALL_HISTORY_FAIL } from "./type";
import axios from "axios";
export const getHistory = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/history");
    dispatch({
      type: GET_ALL_HISTORY,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_ALL_HISTORY_FAIL });
  }
};
