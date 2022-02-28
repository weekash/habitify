import React, { useState, useEffect } from "react";
import HabitCard from "./habitCard";
import { getAllHabits, addReward, deleteHabit } from "../actions/habit";
import { connect } from "react-redux";
import Loader from "./loader/loader";
import Nothing from "./nothing";
import Moment from "react-moment";
import Reward from "./reward";
import habit from "../reducers/habit";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";


const AllHabits = ({
  getAllHabits,
  habits,
  loading,
  addReward,
  deleteHabit,
  history
}) => {
  console.log({history})
  const [state, setState] = useState({
    complete: [],
    incomplete: [],
    disabled: [],
    rewardPopup: false,
    reward: 0,
    id: null,
  });

  const closeReward = () => {
    setState({ ...state, rewardPopup: false });
  };
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
            (item) => item.isCompleted !== true
          )
    });
  }, [loading, addReward, getAllHabits, deleteHabit]);

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
                          <FacebookShareButton
                            url={`${process.env.REACT_APP_URL}/${_id}`}
                            quote={`Hi guys I got a reward on habitify. Check this `}
                          >
                            <FacebookIcon size={26} round />
                          </FacebookShareButton>

                          <WhatsappShareButton
                          className="ml_8"
                            url={`${process.env.REACT_APP_URL}/${_id}`}
                            title={`Hi guys I got a reward on habitify. Check this `}
                          >
                            <WhatsappIcon size={26} round />
                          </WhatsappShareButton>
                          <TwitterShareButton
                          className="ml_8"
                            url={`${process.env.REACT_APP_URL}/${_id}`}
                            title={`Hi guys I got a reward on habitify. Check this `}
                          >
                            <TwitterIcon size={26} round />
                          </TwitterShareButton>

                        </div>

                      )}
                      {state.rewardPopup && 
                        <Reward
                          id={state.id}
                          reward={reward}
                          addReward={addReward}
                          closeReward={closeReward}
                        />
                  }
                    </div>
                  </div>
                );
              }
            )}
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
