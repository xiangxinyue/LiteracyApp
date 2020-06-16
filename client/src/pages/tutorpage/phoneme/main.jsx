import React from "react";
import TrainCard from "../../../assets/cards/trainpagecard";
import { Container } from "@material-ui/core";

class PhonemeTutorMain extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Sound Training Tutor main page</h2>
          <hr />
        </div>
        <Container>
          <h3>Review Students' Assignments and Performance</h3>
          <div className="row">
            <TrainCard
              title="Students' Testing Assignment"
              page="/tutor/phoneme/testassign"
              description="In this part, you can check students' practice assignment"
            />
            <TrainCard
              title="Students' Practice Assignment"
              page="/tutor/phoneme/trainassign"
              description="In this part, you can check students' practice assignment"
            />
            <TrainCard
              title="Students' Weekly Assignment"
              page="/tutor/phoneme/evalassign"
              description="In this part, you can check students' weekly assignments"
            />
            <TrainCard
              title="Students' Performance"
              page="/tutor/phoneme/performance"
              description="In this part, you can check students' performance"
            />
          </div>
          <h3>Modify Phoneme Database</h3>
          <div className="row">
            <TrainCard
              title="Create Weekly Assignment"
              page="/tutor/phoneme/assignment"
              description="In this part, you can create new weekly assignment"
            />
            <TrainCard
              title="Modify Learning Materials"
              page="/tutor/phoneme/materials"
              description="In this part, you can modify the lastest Speed training materials"
            />
            <TrainCard
              title="Modify Training data"
              page="/tutor/phoneme/traindata"
              description="In this part, you can modify speed training data"
            />
            <TrainCard
              title="Modify Testing data"
              page="/tutor/phoneme/testdata"
              description="In this part, you can modify speed tesing data"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorMain;
