import React, { useState, useEffect } from "react";
import HabitCard from "./habitCard";
import { getAllHabits, addReward, deleteHabit } from "../actions/habit";
import { connect } from "react-redux";
import Loader from "./loader/loader";
import Nothing from "./nothing";
import Moment from "react-moment";
import Reward from "./reward";
import habit from "../reducers/habit";
const AllHabits = ({
  getAllHabits,
  habits,
  loading,
  addReward,
  deleteHabit,
}) => {
  const [state, setState] = useState({
    complete: [],
    incomplete: [],
    disabled: [],
    rewardPopup: false,
    reward: 0,
    id: null,
  });

  useEffect(() => {
    getAllHabits();
    setState({
      ...state,
      complete:
        loading || !habits
          ? []
          : habits.filter((item) => item.isCompleted !== false),
      incomplete:
        loading || !habits
          ? []
          : habits.filter(
              (item) => item.isCompleted !== true && item.fail <= 3
            ),
      disabled:
        loading || !habits ? [] : habits.filter((item) => item.fail > 3),
    });
  }, [loading, addReward, getAllHabits, deleteHabit]);
  const closeReward = () => {
    setState({ ...state, rewardPopup: false });
  };
  if (loading) return <Loader />;
  return !habits.length ? (
    <Nothing message="There are no habits in collection . Add one now. " />
  ) : (
    <div id="all-habits">
      <h1>Habits Inprogress </h1>
      {state.incomplete.length ? (
        <div className="habit-category">
          {state.incomplete.map((item) => {
            return <HabitCard data={item} key={item._id} />;
          })}
        </div>
      ) : (
        <Nothing message="Looks like you haven't added a new habit" />
      )}

      {state.complete.length ? (
        <>
          <h1>Habits Completed </h1>
          <div className="habit-category">
            {state.complete.map(
              ({ _id, reward, name, lastChecked, rewarded, duration }) => {
                return (
                  <div className="complete-card" key={_id}>
                    <i className="fas fa-trophy"></i>
                    <div>
                      <h1>{name}</h1>
                      <p>
                        Finished On :
                        <Moment format="DD/MM/YYYY">{lastChecked}</Moment>
                      </p>

                      {!rewarded ? (
                        <button
                          className="btn"
                          onClick={() =>
                            setState({
                              ...state,
                              id: _id,
                              rewardPopup: true,
                              reward: reward,
                            })
                          }
                        >
                          Get Reward
                        </button>
                      ) : (
                        <div id="share-btns">
                          <a href="">
                            <i className="fab fa-whatsapp"></i>
                          </a>
                          {/* <a
                            href={`https://twitter.com/intent/tweet?&text=Hi+guys+do+check+my+progress+on+Habitify&url=${`http://localhost:3000/share/${user}/${duration}/${name}/${reward}`}&hashtags=habit%2Chabitbuilder%2Chabitify%2Cdailycheckout%2C`}
                          >
                            <i className="fab fa-twitter"></i>
                          </a> */}
                          <a href="">
                            <i className="fab fa-twitter"></i>
                          </a>
                          <a href="">
                            <i className="fab fa-facebook"></i>
                          </a>
                        </div>
                      )}
                      {state.rewardPopup ? (
                        <Reward
                          id={state.id}
                          reward={reward}
                          addReward={addReward}
                          closeReward={closeReward}
                        />
                      ) : null}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </>
      ) : null}

      {state.disabled.length ? (
        <>
          <h1>Habits Disabled</h1>
          <div id="disabled">
            {state.disabled.map(({ name, _id, fail }) => {
              return (
                <div className="disabled-card" key={_id}>
                  <h1>{name}</h1>
                  <h2>Fails : {fail}</h2>
                  <p>
                    Can't continue , you failed more than 3 times. Better to
                    delete this and recreate.
                  </p>

                  <button className="btn" onClick={() => deleteHabit(_id)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  habits: state.habit.habits,
  loading: state.habit.loading,
  user: state.auth.user.name,
});
export default connect(mapStateToProps, {
  getAllHabits,
  addReward,
  deleteHabit,
})(AllHabits);
