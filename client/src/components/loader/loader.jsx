import React, { Fragment } from "react";
import loader from "./loader.gif";

export default () => (
  <Fragment>
    <div
      style={{
        position: "fixed",
        top: 0,
        backgroundColor: "#ffffffbb",
        height: "100vh",
        width: "100%",
        zIndex: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <img
        src={loader}
        style={{
          width: "70px",
          margin: "auto",
          display: "block",
          height: "70px",
        }}
        alt="Loading..."
      />
    </div>
  </Fragment>
);
