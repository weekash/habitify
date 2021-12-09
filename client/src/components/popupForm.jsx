import React, { useState } from "react";
import moment from "moment";

const PopupForm = ({ id, checkHabit, closePopup }) => {
  const [state, setState] = useState({
    message: "",
  });

  const handleText = (e) => {
    setState({ [e.target.name]: e.target.value });
  };
  const today =  moment(moment.now()).format('DD/MM/YYYY');

  return (
    <div className="popup">
      <form className="form" onSubmit={() => checkHabit(id, state.message, today)}>
        <label>How's you feel after completing this task?</label>
        <input
          autoFocus
          type="text"
          name="message"
          value={state.message}
          onChange={handleText}
          required
        />
        <div>
          <span onClick={() => setState({ message: "boring" })}>
            boring
          </span>
          <span onClick={() => setState({ message: "fine" })}>
            fine
          </span>
          <span onClick={() => setState({ message: "fine" })}>
            good
          </span>
          <span onClick={() => setState({ message: "exciting" })}>
            exciting
          </span>
          <span onClick={() => setState({ message: "tiring" })}>
            tiring
          </span>
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
        <button className="btn close" type="button" onClick={closePopup}>
          X
        </button>
      </form>
    </div>
  );
};

export default PopupForm;
