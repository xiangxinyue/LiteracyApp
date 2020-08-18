import React from "react";
import TrainCard from "../../../assets/cards/trainpagecard";
import { Container } from "@material-ui/core";

class PrintTutorMain extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Print Session Tutor Main Page</h2>
          <hr />
        </div>
        <Container>
          <h3>Review Students' Assignments and Performance</h3>
          <div className="row">
            <TrainCard
              title="Students' Access Assignment"
              page="/tutor/print/test"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Students' Assignment"
              page="/tutor/print/assign"
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
          <h3>Modify Print Database</h3>
          <div className="row">
            <TrainCard
              title="Modify Print Question 1 Data"
              page="/tutor/print/q1data"
              description="You can modify question 1 data here"
            />
            <TrainCard
              title="Modify Print Question 2 Data"
              page="/tutor/print/q2data"
              description="You can modify question 2 data here"
            />
            <TrainCard
              title="Modify Print Question 3 Data"
              page="/tutor/print/q3data"
              description="You can modify question 3 data here"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default PrintTutorMain;
