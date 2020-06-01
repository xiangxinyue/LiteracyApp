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

  componentDidUpdate = async () => {
    const { currentUser } = this.props;
    // const done = await checkLatestPhonemeDone(currentUser);
    // if (!done) {
    //   this.setState({ evaluationDone: false });
    // }
  };

  render() {
    const { currentUser } = this.props;
    const { understand, startTrain, evaluationDone } = this.state;
    return (
      <div>
        <PhonemeHeader part="Training Main Page" />
        <Container>
          {currentUser ? (
            currentUser.phoneme_curr_score === -1 ? (
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
                  title="Learning Materials"
                  page="/student/phoneme/materials"
                  description="In this part, you can learn the lastest Speed training materials"
                />
                <TrainCard
                  title="Practice"
                  page="/student/phoneme/practise"
                  description="In this part, you can practice the Speed Training as much as you want"
                />
                <TrainCard
                  title="Weekly Assignment"
                  page="/student/phoneme/assignment"
                  description="In this part, you can do the weekly Speed training evaluation assignment"
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
