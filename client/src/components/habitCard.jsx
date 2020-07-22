import React from "react";
import Moment from "react-moment";
const HabitCard = ({ data: { name, duration, pass, fail, dateCreated } }) => {
  return (
    <div className="card">
      <div className="card-top">
        <i className="fas fa-angle-right"></i>
        <div>
          <h1>{name}</h1>
          <p>Duration : {duration} days</p>
        </div>
      </div>
      <progress max={duration} value={pass}></progress>
      <p>
        Created : <Moment fromNow>{dateCreated}</Moment>
      </p>
      <div className="progress-info">
        <span>Checks: {pass} </span>
        <span>Fails : {fail} </span>
      </div>
      <div className="card-bottom">
        <span>{duration - pass} days remaining</span>
        <span>
          {pass}/{duration} days
        </span>
      </div>
    </div>
  );
};

export default HabitCard;
