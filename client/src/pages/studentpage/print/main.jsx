import React, { Component } from "react";
import Process from "../../../assets/process";
import { connect } from "react-redux";
import PrintHeader from "../../../components/student/print/assets/header";
import PrintTestIntro from "../../../components/student/print/test/testintro";
import PrintTestPart from "../../../components/student/print/test/testpart";
import { Container } from "@material-ui/core";
import Paper from "../../../assets/paper";
import TrainCard from "../../../assets/cards/trainpagecard";

class PrintTrain extends Component {
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
        <PrintHeader part="Training Main Page" />
        <Container style={{ paddingBottom: 50 }}>
          {currentUser ? (
            <div>
              {currentUser.print_score.length === 0 ? (
                !understand ? (
                  <PrintTestIntro
                    handleClick={() =>
                      this.setState({ understand: !understand })
                    }
                  />
                ) : (
                  <PrintTestPart />
                )
              ) : (
                <div className="row">
                  <TrainCard
                    title="Learning"
                    page="/student/print/learning"
                    description="Here, you can look at the print learning materials"
                  />
                  <TrainCard
                    title="Assignment"
                    page="/student/print/assignment"
                    description="Here, you can do the assignment for the print part"
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

export default connect(mapStateToProps)(PrintTrain);
