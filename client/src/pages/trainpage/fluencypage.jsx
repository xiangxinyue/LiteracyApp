import React, { Component } from "react";
import FluencyTrainPart from "../../components/trainpart/fluency/trainpart";
import FluencyTestPart from "../../components/trainpart/fluency/testpart";
// import FluencyAssignPart from "../../components/instructor/fluencyassign";
import Paper from "../../assets/paper";
import Process from "../../assets/process";
import Fluencytainintro from "../../components/trainpart/fluency/trainintro";
import { connect } from "react-redux";
import SignInHeader from "../../components/header/signinheader";
import FluencyMaterials from "../../components/trainpart/fluency/materials";
import Button from "@material-ui/core/Button";

class FluencyTrain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTrain: false,
      understand: false,
    };
  }

  getUserOrLogin = () => {
    const { currentUser } = this.props;
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

  render() {
    const { currentUser } = this.props;
    const { understand, startTrain } = this.state;
    return (
      <div>
        <div className="jumbotron">{this.getUserOrLogin()}</div>
        <div className={"container"} style={{ paddingBottom: 50 }}>
          {currentUser ? (
            <div>
              {currentUser.fluency_curr_score == -1 ? (
                <Paper component={FluencyTestPart} />
              ) : (
                <div>
                  {startTrain ? (
                    !understand ? (
                      <Fluencytainintro
                        handleClick={() => this.setState({ understand: true })}
                      />
                    ) : (
                      <Paper component={FluencyTrainPart} />
                    )
                  ) : (
                    <div>
                      <FluencyMaterials />
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() =>
                          this.setState({ startTrain: !startTrain })
                        }
                      >
                        Start Practise
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Process />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FluencyTrain);
