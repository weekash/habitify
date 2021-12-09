import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Loader from "../components/loader/loader";
import { Switch, Link } from "react-router-dom";
import HabitForm from "./habitForm";
import PrivateRoute from "./privateRoute";
import AllHabits from "./allHabits";
import Tasks from "./tasks";
import History from "./history";
import Nothing from "./nothing";
const Dashboard = ({ logout, isAuthenticated, loading, user }) => {
  const [state, setState] = useState({
    name: "",
  });
  useEffect(() => {
    if (user) {
      setState({ ...state, name: loading || !user.name ? "" : user.name });
    }
  }, [loading, user]);
  if (loading) return <Loader />;

  return (
    <div id="dashboard">
      <div id="left-menu">
        <img src="/user.png" />
        <h3>Welcome {state.name} </h3>
        <Link to="/dashboard/addhabit">
          <button className="btn"> + Add habit</button>
        </Link>
        <Link to="/dashboard">CheckIn</Link>
        <Link to="/dashboard/habits">My Habits</Link>
        <Link to="/dashboard/history">My Progress</Link>
        <Link to="">Rewards</Link>
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>
      <div id="right-view">
        <Switch>
          <PrivateRoute path="/dashboard/habits" component={AllHabits} />
          <PrivateRoute path="/dashboard/addhabit" component={HabitForm} />
          <PrivateRoute path="/dashboard/history" component={History} />
          <PrivateRoute path="/dashboard" component={Tasks} />
          <Nothing />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(Dashboard);
