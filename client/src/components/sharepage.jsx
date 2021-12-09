import React, { useState, useEffect } from "react";
import { getHabitAndUserById } from "../actions/habit";
import { getUserById } from "../actions/auth";
import { connect } from "react-redux";
import Loader from "./loader/loader";
import Nothing from "./nothing";

function captialize(str) {
  return str.slice(0,1).toUpperCase() + str.slice(1, str.length);
}
const SharePage = ({
  user,
  getHabitAndUserById,
  match,
  habitdata,
  authloading,
  habitloading,
}) => {
  const [state, setState] = useState({
    name: "",
    reward: 0,
    duration: 0,
    habit: "",
  });
  useEffect(() => {
    let id = match.params.id;
    id && getHabitAndUserById(id);

    setState({
      ...state,
      reward: !habitdata || habitloading ? 0 : habitdata.reward,
      duration: !habitdata || habitloading ? 0 : habitdata.duration,
      habit: !habitdata || habitloading ? "" : habitdata.name,
      name: !user || habitloading ? "" : user.name,
    });
  }, [getHabitAndUserById, habitloading]);

  const { name, habit, reward, duration } = state;
  if (habitloading || authloading) return <Loader />;
  
  if (!habit)
    return (
      <Nothing message="Page for which you are looking is not available" />
    );

  return (
    <div id="share-page">
      <div id="share-box">
        <img src="/award.jpg" />
        <div>
          <h1>
            <b> {captialize(name)} </b> has successfullly completed his practice for the habit
            <b> " {habit} " </b> in just <b> {duration} </b> days. Also he won
            <b> {reward} </b> credits.
          </h1>
          <p>
            If you are also interested in this product click on button below
          </p>
          <a href="http://localhost:3000/login">
            <button className="btn">I'm interested</button>
          </a>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  habitdata: state.habit.habits,
  user: state.auth.user,
  authloading: state.auth.loading,
  habitloading: state.habit.loading,
});
export default connect(mapStateToProps, { getHabitAndUserById, getUserById })(
  SharePage
);
