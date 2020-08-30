import React, { Component } from "react";
import Process from "../../../assets/process";
import { connect } from "react-redux";
import FluencyHeader from "../../../components/student/fluency/assets/header";
import FluencyTestIntro from "../../../components/student/fluency/test/testintro";
import FluencyTestPart from "../../../components/student/fluency/test/testpart";
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
        <FluencyHeader part="Training Main Page" />
        <Container style={{ paddingBottom: 50 }}>
          {currentUser ? (
            <div>
              {currentUser.fluency_score.length === 0 ? (
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
                <div className="row">
                  <TrainCard
                    title="Learning"
                    page="/student/fluency/learning"
                    description="Here, you will learn how to increase your reading speed"
                  />
                  <TrainCard
                    title="Assignment"
                    page="/student/fluency/assignment"
                    description="Here, you will complete tests of reading speed"
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
