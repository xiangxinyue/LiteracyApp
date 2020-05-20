import React, { Component } from "react";
import FluencyTestPart from "../../components/fluency/testpart";
// import FluencyAssignPart from "../../components/instructor/fluencyassign";
import Process from "../../assets/process";
import { connect } from "react-redux";
import FluencyHeader from "../../components/fluency/header";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import TrainCard from "../../assets/cards/trainpagecard";

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
    return (
      <div>
        <FluencyHeader />
        <div className={"container"} style={{ paddingBottom: 50 }}>
          {currentUser ? (
            <div>
              {currentUser.fluency_curr_score == -1 ? (
                <Container>
                  <FluencyTestPart />
                </Container>
              ) : (
                <div>
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
                  <TrainCard
                    title="Learning Materials"
                    page="/student/fluency/materials"
                    description="In this part, you can learn the lastest Speed training materials"
                  />
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
