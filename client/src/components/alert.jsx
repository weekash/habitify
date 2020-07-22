import React from "react";
import { connect } from "react-redux";
const Alert = ({ alerts }) => {
  if (!alerts.length || alerts == null) {
    return null;
  }
  return (
    <div>
      {alerts.map(({ id, message, alertType }) => {
        return (
          <div className={`alert ${alertType}`} key={id}>
            {message}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
