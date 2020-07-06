import React from "react";
import { connect } from "react-redux";
import SignInHeader from "../../../header/signinheader";

const PrintHeader = (props) => {
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
            <h2>Welcome to Meaning {props.part}</h2>
            <hr />
            {currentUser.print_curr_score == -1 ? null : (
              <h3 className="text-success">
                Your current meaning score is {currentUser.print_curr_score}
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

export default connect(mapStateToProps)(PrintHeader);
