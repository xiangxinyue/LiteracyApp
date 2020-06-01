import React from "react";
import { Container, Button } from "@material-ui/core";
import PhonemePart from "../../../components/tutor/phoneme/phonemeassign";
import AudioPart from "../../../components/tutor/phoneme/audioassign";

class PhonemeTutorAssign extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Sound Weekly Assignment Creation Page</h2>
          <hr />
          <Button color="default" variant="contained" href="/tutor/phoneme">
            Go Back
          </Button>
        </div>
        <Container>
          Assignment Part 1: Phoneme Part
          <PhonemePart />
          <hr />
          Assignment Part 2: Audio Recording
          <AudioPart />
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorAssign;
