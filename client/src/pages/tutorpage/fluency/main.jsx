import React from "react";
import TrainCard from "../../../assets/cards/trainpagecard";
import { Container } from "@material-ui/core";

class FluencyTutorMain extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Speed Training Tutor main page</h2>
          <hr />
        </div>
        <Container>
          <h3>Review Students' Assignments and Performance</h3>
          <div className="row">
            <TrainCard
              title="Students' Testing Assignment"
              page="/tutor/fluency/testassign"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Students' Practice Assignment"
              page="/tutor/fluency/trainassign"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Students' Evaluation Assignment"
              page="/tutor/fluency/evalassign"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Create Weekly Assignment"
              page="/tutor/fluency/assignment"
              description="In this part, you can create new weekly assignment"
            />
            <TrainCard
              title="Students' Performance"
              page="/tutor/fluency/performance"
              description="In this part, you can check students' performance"
            />
          </div>
        </Container>
        <hr />

        <Container>
          <h3>Modify Fluency Database</h3>
          <div className="row">
            <TrainCard
              title="Modify Learning Materials"
              page="/tutor/fluency/materials"
              description="In this part, you can modify the lastest Speed training materials"
            />
            <TrainCard
              title="Modify Training data"
              page="/tutor/fluency/traindata"
              description="In this part, you can modify speed training data"
            />
            <TrainCard
              title="Modify Testing data"
              page="/tutor/fluency/testdata"
              description="In this part, you can modify speed tesing data"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default FluencyTutorMain;
