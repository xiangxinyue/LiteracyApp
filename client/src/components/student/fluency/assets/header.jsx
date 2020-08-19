import React from "react";
import { connect } from "react-redux";
import SignInHeader from "../../../header/signinheader";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";

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
            <P1>Welcome to Speed {props.part}</P1>
            <hr />
            {currentUser.fluency_curr_score == -1 ? null : (
              <P3 className="text-success">
                Your current reading speed is {currentUser.fluency_curr_score}{" "}
                (ms / letter)
              </P3>
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
