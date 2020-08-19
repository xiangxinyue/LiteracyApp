import React, { Component } from "react";
import Process from "../../../assets/process";
import { connect } from "react-redux";
import MeaningHeader from "../../../components/student/meaning/assets/header";
import MeaningTestIntro from "../../../components/student/meaning/test/testintro";
import MeaningTestPart from "../../../components/student/meaning/test/testpart";
import { Container } from "@material-ui/core";
import TrainCard from "../../../assets/cards/trainpagecard";

class MeaningTrain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTrain: false,
      understand: false,
    };
  }

  render() {
    const { currentUser } = this.props;
    const { understand } = this.state;
    return (
      <div>
        <MeaningHeader part="Training Main Page" />
        <Container style={{ paddingBottom: 50 }}>
          {currentUser ? (
            <div>
              {currentUser.meaning_curr_score == -1 ? (
                !understand ? (
                  <MeaningTestIntro
                    handleClick={() =>
                      this.setState({ understand: !understand })
                    }
                  />
                ) : (
                  <MeaningTestPart />
                )
              ) : (
                <div className="row">
                  <TrainCard
                    title="Learning"
                    page="/student/meaning/learning"
                    description="Here, you can look at the meaning learning materials"
                  />
                  <TrainCard
                    title="Assignment"
                    page="/student/meaning/assignment"
                    description="Here, you can do the assignment for the meaning part"
                  />
                </div>
              )}
            </div>
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

export default connect(mapStateToProps)(MeaningTrain);
