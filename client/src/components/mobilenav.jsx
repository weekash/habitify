import React from "react";
const MobileNav = () => {
  return (
    <div id="mobile">
      <a href="/">
        <i className="fas fa-home"></i>
      </a>
      <a href="/dashboard/habits">
        <i className="fas fa-running"></i>
      </a>
      <a href="/dashboard/addhabit">
        <i className="fas fa-plus"></i>
      </a>
      <a href="/dashboard">
        <i className="fas fa-tasks"></i>
      </a>
      <a href="/dashboard/history">
        <i className="fas fa-user"></i>
      </a>
    </div>
  );
};

export default MobileNav;
