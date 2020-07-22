import React, { useState } from "react";

const PopupForm = ({ id, checkHabit, closePopup }) => {
  const [state, setState] = useState({
    message: "",
  });

  const handleText = (e) => {
    setState({ [e.target.name]: e.target.value });
  };

  return (
    <div className="popup">
      <form className="form" onSubmit={() => checkHabit(id, state.message)}>
        <label>How's you feel after completing this task?</label>
        <input
          type="text"
          name="message"
          value={state.message}
          onChange={handleText}
          required
        />
        <div>
          <span onClick={() => setState({ message: "It was boring" })}>
            It was boring
          </span>
          <span onClick={() => setState({ message: "It was fine" })}>
            It was fine
          </span>
          <span onClick={() => setState({ message: "Totally Exciting" })}>
            Totally Exciting
          </span>
          <span onClick={() => setState({ message: "I'm tired" })}>
            I'm tired
          </span>
          <span onClick={() => setState({ message: "I enjoyed" })}>
            I enjoyed
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
