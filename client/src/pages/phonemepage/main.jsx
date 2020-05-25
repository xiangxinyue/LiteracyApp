import React, { Component } from "react";
import { connect } from "react-redux";
import PhonemeTestPart from "../../components/phoneme/testpart";
import Phonemetestintro from "../../components/phoneme/testintro";
import Process from "../../assets/process";
import PhonemeHeader from "../../components/phoneme/header";
import TrainCard from "../../assets/cards/trainpagecard";

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
        <PhonemeHeader />
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
            ) : (
              <div>
                <TrainCard
                  title="Learning Materials"
                  page="/student/phoneme/materials"
                  description="In this part, you can learn the lastest Speed training materials"
                />
                <TrainCard
                  title="Practise"
                  page="/student/phoneme/practise"
                  description="In this part, you can practise the Speed Training as much as you want"
                />
                <TrainCard
                  title="Audio Record"
                  page="/student/phoneme/audiorecord"
                  description="In this part, you can practise the Speed Training as much as you want"
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PhonemeTrain);
