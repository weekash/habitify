import React, { useState } from "react";
import Alert from "./alert";
import { addHabit } from "../actions/habit";
import { connect } from "react-redux";
const HabitForm = ({ addHabit }) => {
  const [state, setState] = useState({
    name: "",
    duration: "",
  });
  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    const { name, duration } = state;

    addHabit(name, duration);
    setState({ name: "", duration: "" });
  };
  let { name, duration } = state;
  return (
    <form className="form" onSubmit={submitForm}>
      <h1>Add a Habit</h1>
      <Alert />
      <label>Enter what you want to acheive</label>
      <input
        type="text"
        maxLength="50"
        name="name"
        value={name}
        onChange={handleText}
      />
      <label>Estimated duration in days</label>
      <input
        type="number"
        name="duration"
        onChange={handleText}
        value={duration}
      />
      <button className="btn" type="submit">
        Add Habit
      </button>
    </form>
  );
};

export default connect(null, { addHabit })(HabitForm);
