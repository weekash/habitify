import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
          <Link to="/" className="text-gradient">
            Habitify{" "}
          </Link>
        </h1>
        <div>
          <ul className="remove-in-mobile">
            <li>
              {!isAuthenticated ? (
                <Link to="/login">Login</Link>
              ) : (
                <Link to="/dashboard">
                  <img src="/user.png" />
                </Link>
              )}
            </li>
            <li>
              <Link to="/#features">About</Link>
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
