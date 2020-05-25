import React from "react";
import { connect } from "react-redux";
import SignInHeader from "../header/signinheader";

const PhonemeHeader = (props) => {
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
            <h2>Welcome to Sound Training</h2>
            <hr />
            {currentUser.phoneme_curr_score == -1 ? null : (
              <h3 className="text-success">
                Your current Sound Training Score is{" "}
                {currentUser.phoneme_curr_score} / 20
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

export default connect(mapStateToProps)(PhonemeHeader);
