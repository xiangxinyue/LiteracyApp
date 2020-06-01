import React, { Component } from "react";
import Process from "../../../assets/process";
import { connect } from "react-redux";
import FluencyHeader from "../../../components/student/fluency/header";
import FluencyTestIntro from "../../../components/student/fluency/testintro";
import FluencyTestPart from "../../../components/student/fluency/testpart";
import { Container, Button } from "@material-ui/core";
import Paper from "../../../assets/paper";
import TrainCard from "../../../assets/cards/trainpagecard";

class FluencyTrain extends Component {
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
        <FluencyHeader />
        <Container style={{ paddingBottom: 50 }}>
          {currentUser ? (
            <div>
              {currentUser.fluency_curr_score == -1 ? (
                !understand ? (
                  <FluencyTestIntro
                    handleClick={() =>
                      this.setState({ understand: !understand })
                    }
                  />
                ) : (
                  <Paper component={FluencyTestPart} />
                )
              ) : (
                <div>
                  <TrainCard
                    title="Learning Materials"
                    page="/student/fluency/materials"
                    description="In this part, you can learn the lastest Speed training materials"
                  />
                  <TrainCard
                    title="Practise"
                    page="/student/fluency/practise"
                    description="In this part, you can practise the Speed Training as much as you want"
                  />
                  <TrainCard
                    title="Weekly Assignment"
                    page="/student/fluency/assignment"
                    description="In this part, you can do the weekly Speed training evaluation assignment"
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

export default connect(mapStateToProps)(FluencyTrain);
