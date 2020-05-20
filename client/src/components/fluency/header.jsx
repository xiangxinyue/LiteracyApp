import React from "react";
import { connect } from "react-redux";
import SignInHeader from "../header/signinheader";

const FluencyHeader = (props) => {
  const { currentUser } = props;
  const renderPage = () => {
    switch (currentUser) {
      case null:
        return;
      case false:
        return <SignInHeader />;
      default:
        return (
          <p>
            <h2>Welcome to Speed Training</h2>
            <hr />
            {currentUser.fluency_curr_score == -1 ? null : (
              <h3 className="text-success">
                Your current reading speed is {currentUser.fluency_curr_score}{" "}
                (words/min)
              </h3>
            )}
          </p>
        );
    }
  };
  return <div className="jumbotron">{renderPage()}</div>;
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FluencyHeader);
