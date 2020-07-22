import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getHistory } from "../actions/history";
import Moment from "react-moment";
import Nothing from "./nothing";
import MobileBoard from "./mobileboard";
const History = ({ getHistory, history }) => {
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <>
      <MobileBoard />
      <div id="history">
        <h1>Your History</h1>
        {history.length ? (
          history.map(({ _id, message, habitName, checkedAt }) => {
            return (
              <div className="history-card" key={_id}>
                <h1>{message}</h1>
                <h2>Habit Name: {habitName}</h2>
                <p>
                  <Moment fromNow>{checkedAt}</Moment>
                </p>
              </div>
            );
          })
        ) : (
          <Nothing message="You don't have any history right now" />
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  loading: state.history.loading,
  history: state.history.history,
});
export default connect(mapStateToProps, { getHistory })(History);
