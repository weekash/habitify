import React from "react";
const Nothing = ({ message }) => {
  return (
    <div className="nothing">
      <img src="/nothing.svg" />
      <p>{message}</p>
    </div>
  );
};

export default Nothing;
