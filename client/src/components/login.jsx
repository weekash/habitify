import React, { useState, useEffect } from "react";
import { loginUser } from "../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "./alert";
const Login = ({ loginUser, isAuthenticated }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    const { email, password } = state;

    loginUser(email, password);
  };
  if (isAuthenticated) return <Redirect to="/dashboard" />;
  return (
    <form className="form" onSubmit={submitForm}>
      <h1>Login</h1>
      <Alert />
      <label>Email</label>
      <input type="email" name="email" required onChange={handleText} />
      <label>Password</label>
      <input type="password" name="password" required onChange={handleText} />
      <button type="submit" className="btn">
        Login
      </button>
      <a href="/register">Don't have an account? Create one now...</a>
    </form>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { loginUser })(Login);
