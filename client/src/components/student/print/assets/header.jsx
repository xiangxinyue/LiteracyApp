import React from "react";
import { connect } from "react-redux";
import SignInHeader from "../../../header/signinheader";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";

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
          <div>
            <P1>Welcome to Print {props.part}</P1>
            <hr />
            {currentUser.print_curr_score == -1 ? null : (
              <P3 className="text-success">
                Your current print score is {currentUser.print_curr_score}
              </P3>
            )}
          </div>
        );
    }
  };
  return <div className="jumbotron">{renderPage()}</div>;
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PrintHeader);
