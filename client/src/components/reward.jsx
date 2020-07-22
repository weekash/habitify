import React from "react";
const Reward = ({ id, reward, addReward, closeReward }) => {
  return (
    <div id="reward-bg">
      <div id="reward">
        <img src="/fireworks.png"></img>
        <h1>
          Wohoo !! You have received <strong>{reward}</strong> credits
        </h1>
        <button
          className="btn"
          onClick={() => {
            addReward(id, reward);
            closeReward();
            window.location.reload(false);
          }}
        >
          Add to your account
        </button>
      </div>
    </div>
  );
};

export default Reward;
