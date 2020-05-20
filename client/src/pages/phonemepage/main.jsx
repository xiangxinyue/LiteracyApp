import React, { Component } from "react";
import { connect } from "react-redux";
import PhonemeTrainPart from "../../components/trainpart/phoneme/trainpart";
import PhonemeTestPart from "../../components/trainpart/phoneme/testpart";
import Phonemetrainintro from "../../components/trainpart/phoneme/trainintro";
import Phonemetestintro from "../../components/trainpart/phoneme/testintro";
import { Button } from "@material-ui/core";
import Process from "../../assets/process";
import SignInHeader from "../../components/header/signinheader";
import PhonemeMaterials from "../../components/trainpart/phoneme/materials";

class PhonemeTrain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      understand: false,
      startTrain: false,
      evaluationDone: true,
    };
  }

  componentDidUpdate = async () => {
    const { currentUser } = this.props;
    // const done = await checkLatestPhonemeDone(currentUser);
    // if (!done) {
    //   this.setState({ evaluationDone: false });
    // }
  };

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
            <h2>Welcome to the Phoneme Training</h2>
            <hr />
            {currentUser.phoneme_curr_score == -1 ? null : (
              <h3 className="text-success">
                Your current Sound training level is{" "}
                {currentUser.phoneme_curr_score}
              </h3>
            )}
          </p>
        );
    }
  };

  render() {
    const { currentUser } = this.props;
    const { understand, startTrain, evaluationDone } = this.state;
    return (
      <div>
        <div className="jumbotron">{this.getUserOrLogin()}</div>
        <div className="container">
          {currentUser ? (
            currentUser.phoneme_curr_score === -1 ? (
              !understand ? (
                <Phonemetestintro
                  handleClick={() => this.setState({ understand: true })}
                />
              ) : (
                <PhonemeTestPart />
              )
            ) : startTrain ? (
              !understand ? (
                <Phonemetrainintro
                  handleClick={() => this.setState({ understand: true })}
                />
              ) : (
                <PhonemeTrainPart />
              )
            ) : (
              <div>
                <PhonemeMaterials />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => this.setState({ startTrain: !startTrain })}
                >
                  Start Practise
                </Button>
                {/* {evaluationDone ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled="true"
                      size="large"
                      href="/phonemeevaluation"
                    >
                      You have finished this week's Assignment
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    href="/phonemeevaluation"
                  >
                    Assignment
                  </Button>
                )} */}
              </div>
            )
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

export default connect(mapStateToProps)(PhonemeTrain);
