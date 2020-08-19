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
          <h2>Welcome to Meaning Session Tutor Main Page</h2>
          <hr />
        </div>
        <Container>
          <h3>Review Students' Assignments and Performance</h3>
          <div className="row">
            <TrainCard
              title="Students' Access Assignment"
              page="/tutor/meaning/test"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Students' Assignment"
              page="/tutor/meaning/assign"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Students' Performance"
              page="/tutor/meaning/performance"
              description="In this part, you can check students' performance"
            />
          </div>
        </Container>
        <hr />

        <Container>
          <h3>Modify Meaning Database</h3>
          <div className="row">
            <TrainCard
              title="Modify Meaning Question 1 Data"
              page="/tutor/meaning/q1data"
              description="You can modify question 1 data here"
            />
            <TrainCard
              title="Modify Meaning Question 2 Data"
              page="/tutor/meaning/q2data"
              description="You can modify question 2 data here"
            />
            <TrainCard
              title="Modify Meaning Question 3 Data"
              page="/tutor/meaning/q3data"
              description="You can modify question 3 data here"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default MeaningTutorMain;
