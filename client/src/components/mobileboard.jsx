import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
const MobileBoard = ({ name, logout }) => {
  return (
    <div id="mobile-board">
      <img src="/user.png" />
      <h1>Welcome {name}</h1>
      <button className="btn" onClick={() => logout()}>
        LOGOUT
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.auth.user.name,
});
export default connect(mapStateToProps, { logout })(MobileBoard);
