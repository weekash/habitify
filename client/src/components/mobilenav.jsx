import React from "react";
import { Link } from "react-router-dom";
const MobileNav = () => {
  return (
    <div id="mobile">
      <Link to="/">
        <i className="fas fa-home"></i>
      </Link>
      <Link to="/dashboard/habits">
        <i className="fas fa-running"></i>
      </Link>
      <Link to="/dashboard/addhabit">
        <i className="fas fa-plus"></i>
      </Link>
      <Link to="/dashboard">
        <i className="fas fa-tasks"></i>
      </Link>
      <Link to="/dashboard/history">
        <i className="fas fa-user"></i>
      </Link>
    </div>
  );
};

export default MobileNav;
