import React from "react";
import { connect } from "react-redux";
import SignInHeader from "../../../header/signinheader";
import { Button } from "@material-ui/core";

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
            <h2>Welcome to Speed {props.part}</h2>
            <hr />
            {currentUser.fluency_curr_score == -1 ? (
              <h3 className="text-success">
                You have not had Reading Speed score yet, this may be caused by:
                <br />
                1. You have not taken the testing assignment.
                <br />
                2. Your testing assignment has not been reviewed by your tutor.
              </h3>
            ) : (
              <h3 className="text-success">
                Your current reading speed is {currentUser.fluency_curr_score}{" "}
                (ms / letter)
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
