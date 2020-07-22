import React, { useState, useEffect } from "react";
import { checkHabit, getAllHabits } from "../actions/habit";
import { connect } from "react-redux";
import Loader from "./loader/loader";
import Alert from "./alert";
import Moment from "react-moment";
import PopupForm from "./popupForm";
import Nothing from "./nothing";
const Tasks = ({ getAllHabits, checkHabit, loading, habits }) => {
  const [state, setState] = useState({
    popup: false,
    id: null,
    checked: [],
    unchecked: [],
  });

  useEffect(() => {
    getAllHabits();
    setState({
      ...state,
      checked:
        loading && !habits
          ? []
          : habits.filter((item) => item.todayChecked != false),
      unchecked:
        loading && !habits
          ? []
          : habits.filter(
              (item) => item.todayChecked != true && item.fail <= 3
            ),
    });
  }, [getAllHabits, loading]);
  const closePopup = () => {
    setState({ ...state, popup: false });
  };
  if (loading) return <Loader />;
  return habits.length ? (
    <div id="tasks">
      <h1>Today's tasks</h1>

      <Alert />

      {state.unchecked.length ? (
        <div className="tasks">
          {state.unchecked.map(({ name, _id, todayChecked, lastUpdated }) => {
            {
              return (
                <div className="task-card" key={_id}>
                  <i className="fas fa-exclamation-circle"></i>
                  <div>
                    <h1>{name}</h1>
                    <p>
                      Last checked: <Moment fromNow>{lastUpdated}</Moment>
                    </p>
                    <button
                      className="btn"
                      onClick={() =>
                        setState({ ...state, popup: true, id: _id })
                      }
                    >
                      CheckIN
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <Nothing message="Cool !!!You have checked all habits" />
      )}

      {state.popup ? (
        <PopupForm
          id={state.id}
          checkHabit={checkHabit}
          closePopup={closePopup}
        />
      ) : null}
      <h1>Finished tasks</h1>

      {state.checked.length ? (
        <div className="tasks">
          {state.checked.map(({ name, _id, todayChecked, lastUpdated }) => {
            return (
              <div
                className="checked-card"
                key={_id}
                onSubmit={() => checkHabit(_id, state.message)}
              >
                <i className="fas fa-check-circle"></i>
                <div>
                  <h1>{name}</h1>
                  <p>
                    Updated <Moment fromNow>{lastUpdated}</Moment>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Nothing message=" You haven't checked any habits yet" />
      )}
    </div>
  ) : (
    <Nothing message="Looks like , you haven't added a habit" />
  );
};

const mapStateToProps = (state) => ({
  habits: state.habit.habits,
  loading: state.habit.loading,
});

export default connect(mapStateToProps, { getAllHabits, checkHabit })(Tasks);
