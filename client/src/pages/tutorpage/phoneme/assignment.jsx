import React from "react";
import { Container, Button } from "@material-ui/core";
import PhonemePart from "../../../components/tutor/phoneme/phonemeassign";
import AudioPart from "../../../components/tutor/phoneme/audioassign";
import axios from "axios";

class PhonemeTutorAssign extends React.Component {
  constructor() {
    super();
    this.state = {
      phonemeAssign: [],
      audioAssign: [],
    };
  }

  submitAssignment = async () => {
    const { phonemeAssign, audioAssign } = this.state;
    await axios.post("/api/phoneme/evalassign/add", {
      phonemeAssign,
      audioAssign,
    });
    window.location = "/tutor/phoneme";
  };

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
          <h3>Part 1: Phoneme Part</h3>
          <PhonemePart
            handlePhonemeAssign={(data) =>
              this.setState({ phonemeAssign: data })
            }
          />
          <hr />
          <h3>Part 2: Audio Recording</h3>
          <AudioPart
            handleAudioAssign={(data) => this.setState({ audioAssign: data })}
          />
          <hr />
          <Button
            color="primary"
            variant="contained"
            onClick={this.submitAssignment}
          >
            Submit the whole assignment
          </Button>
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorAssign;
