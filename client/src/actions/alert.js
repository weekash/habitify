import { SET_ALERT, REMOVE_ALERT } from "./type";
import { v4 as uuidv4 } from "uuid";
export const setAlert = (message, alertType) => (dispatch) => {
  let id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { id, message, alertType },
  });
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, 5000);
};
