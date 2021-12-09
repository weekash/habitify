import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Banner from "./components/banner";
import Login from "./components/login";
import Register from "./components/register";
import MobileNav from "./components/mobilenav";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/privateRoute";
import { loadUser } from "./actions/auth";
import store from "./store";
import Loader from "./components/loader/loader";
import Reward from "./components/reward";
import SharePage from "./components/sharepage";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    // let elements = document.getElementsByTagName("input");
    // let mobilenav = document.getElementById("mobile");
    // console.log(elements);
    // for (let i = 0; i < elements.length; i++) {
    //   elements[i].addEventListener("focus", () => {
    //     mobilenav.style.display = "none";
    //   });
    //   elements[i].addEventListener("blur", () => {
    //     mobilenav.style.display = "flex";
    //   });
    // }
  }, []);
  return (
    <Router>
      <MobileNav />

      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/share/:id" component={SharePage} />
        <Route path="/" component={Banner} />
      </Switch>
    </Router>
  );
}

export default App;
