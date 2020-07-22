import React, { useState } from "react";
import { registerUser } from "../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "./alert";
const Register = ({ registerUser, isAuthenticated }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    const { name, email, password } = state;

    registerUser(name, email, password);
  };
  if (isAuthenticated) return <Redirect to="/dashboard" />;
  return (
    <form className="form" id="register-form" onSubmit={submitForm}>
      <h1>Register Yourself</h1>
      <Alert />
      <label>Name</label>
      <input type="text" required name="name" onChange={handleText} />
      <label>Email</label>
      <input type="email" required name="email" onChange={handleText} />
      <label>Password</label>
      <input type="password" required name="password" onChange={handleText} />
      <button type="submit" className="btn">
        Register
      </button>
      <a href="/login">Already have an account? Login now...</a>
    </form>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { registerUser })(Register);
