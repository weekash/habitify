import React from "react";
import Moment from "react-moment";
const HabitCard = ({ data: { name, duration, progress, dateCreated } }) => {
  return (
    <div className="card">
      <div className="card-top">
        <i className="fas fa-angle-right"></i>
        <div>
          <h1>{name}</h1>
          <p>Duration : {duration} days</p>
        </div>
      </div>

      <p>
        Created : <Moment fromNow>{dateCreated}</Moment>
      </p>
    
      <div className="card-bottom">
        <span>{duration - progress.length} days remaining</span>
        <span>
          {progress.length}/{duration} days
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-value"
          style={{ width: `${progress.length / duration * 100}%`}}
        ></div>
      </div>
    </div>
  );
};

export default HabitCard;
