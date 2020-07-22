import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
const Navbar = ({ isAuthenticated, user, loading }) => {
  const [state, setState] = useState({
    reward: 0,
  });
  useEffect(() => {
    setState({ reward: loading || !user ? 0 : user.reward });
  }, [loading, isAuthenticated, user]);
  return (
    <>
      <div id="navbar">
        <h1>
          <a href="/" className="text-gradient">
            Habitify{" "}
          </a>
        </h1>
        <div>
          <ul className="remove-in-mobile">
            <li>
              {!isAuthenticated ? (
                <a href="/login">Login</a>
              ) : (
                <a href="/dashboard">
                  <img src="/user.png" />
                </a>
              )}
            </li>
            <li>
              <a href="/#features">About</a>
            </li>
          </ul>

          {isAuthenticated ? (
            <div>
              <i className="fas fa-coins"></i> {state.reward}
            </div>
          ) : null}
        </div>{" "}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.loading,
});
export default connect(mapStateToProps)(Navbar);
