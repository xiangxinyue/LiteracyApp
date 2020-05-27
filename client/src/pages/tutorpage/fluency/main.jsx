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
            <TrainCard
              title="Modify Weekly Assignment"
              page="/tutor/fluency/assignment"
              description="In this part, you can create new weekly assignment"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default FluencyTutorMain;
