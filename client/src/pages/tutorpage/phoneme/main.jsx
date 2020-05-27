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
          <div className="row">
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
            <TrainCard
              title="Students' Audios"
              page="/tutor/phoneme/allaudios"
              description="In this part, you can check students' audios"
            />
            <TrainCard
              title="Audio Assignment"
              page="/tutor/phoneme/audioassign"
              description="In this part, you can submit new audio assignments"
            />
            <TrainCard
              title="Weekly Assignment"
              page="/tutor/phoneme/assignment"
              description="In this part, you can create new weekly assignment"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorMain;
