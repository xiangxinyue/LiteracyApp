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
              title="Students' Access Assignment"
              page="/tutor/phoneme/test"
              description="In this part, you can check students' access assignment"
            />
            <TrainCard
              title="Students' Assignment"
              page="/tutor/phoneme/assign"
              description="In this part, you can check students' assignments"
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
              title="Modify Learning Materials"
              page="/tutor/phoneme/materials"
              description="In this part, you can modify phoneme learning materilas"
            />
            <TrainCard
              title="Modify Phoneme Data"
              page="/tutor/phoneme/phonemedata"
              description="In this part, you can modify phoneme data"
            />
            <TrainCard
              title="Modify Audio data"
              page="/tutor/phoneme/audiodata"
              description="In this part, you can modify audio data"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorMain;
