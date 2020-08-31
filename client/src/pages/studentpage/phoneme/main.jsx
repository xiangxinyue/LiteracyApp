import React, { Component } from "react";
import { connect } from "react-redux";
import PhonemeTestPart from "../../../components/student/phoneme/test/testpart";
import Phonemetestintro from "../../../components/student/phoneme/test/testintro";
import Process from "../../../assets/process";
import PhonemeHeader from "../../../components/student/phoneme/assets/header";
import TrainCard from "../../../assets/cards/trainpagecard";
import { Container } from "@material-ui/core";

class PhonemeTrain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      understand: false,
      startTrain: false,
      evaluationDone: true,
    };
  }

  render() {
    const { currentUser } = this.props;
    const { understand } = this.state;
    return (
      <div>
        <PhonemeHeader part="Training Main Page" />
        <Container>
          {currentUser ? (
            currentUser.phoneme_score.length === 0 ? (
              !understand ? (
                <Phonemetestintro
                  handleClick={() => this.setState({ understand: true })}
                />
              ) : (
                <PhonemeTestPart />
              )
            ) : (
              <div className="row">
                <TrainCard
                  title="Learning"
                  page="/student/phoneme/learning"
                  description="In this part, you will learn about different kinds of sounds in English"
                />
                <TrainCard
                  title="Assignment"
                  page="/student/phoneme/assignment"
                  description="In this part, we will test your awareness of sounds"
                />
              </div>
            )
          ) : (
            <Process />
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PhonemeTrain);
