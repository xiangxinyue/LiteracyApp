import React from "react";
import TrainCard from "../../../assets/cards/trainpagecard";
import { Container } from "@material-ui/core";

class MeaningTutorMain extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Meaning Training Tutor main page</h2>
          <hr />
        </div>
        <Container>
          <h3>Review Students' Assignments and Performance</h3>
          <div className="row">
            <TrainCard
              title="Students' Testing Assignment"
              page="/tutor/print/testassign"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Students' Practice Assignment"
              page="/tutor/print/trainassign"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Students' Evaluation Assignment"
              page="/tutor/print/evalassign"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Students' Performance"
              page="/tutor/print/performance"
              description="In this part, you can check students' performance"
            />
          </div>
        </Container>
        <hr />

        <Container>
          <h3>Modify Meaning Database</h3>
          <div className="row">
            <TrainCard
              title="Create Weekly Assignment"
              page="/tutor/print/assignment"
              description="In this part, you can create new weekly assignment"
            />
            <TrainCard
              title="Modify Learning Materials"
              page="/tutor/print/materials"
              description="In this part, you can modify the lastest meaning training materials"
            />
            <TrainCard
              title="Modify Meaning Training data"
              page="/tutor/print/data"
              description="In this part, you can modify meaning training data"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default MeaningTutorMain;
