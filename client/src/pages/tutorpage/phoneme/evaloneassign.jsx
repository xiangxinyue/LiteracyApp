import React from "react";
import axios from "axios";
import { Button, Container, TextField } from "@material-ui/core";
import AudioTable from "../../../components/tutor/phoneme/audioanswertable";
import PhonemeTable from "../../../components/tutor/phoneme/phonemeanswertable";

class PhonemeTutorAllAssign extends React.Component {
  constructor() {
    super();
    this.state = { assignments: null, newScore: 0 };
  }

  componentDidMount = async () => {
    const doc = await axios.get(
      "/api/tutor/phoneme/allassign/" + this.props.match.params.id
    );
    this.setState({ assignments: doc.data });
  };

  handleSubmit = async () => {
    const { assignments, newScore } = this.state;
    await axios.post("/api/phoneme/score/update", {
      newScore,
      studentId: assignments.studentId,
      assignId: assignments._id,
      assignDate: assignments.assignDate,
    });
    window.location = "/tutor/phoneme/allassign";
  };

  render() {
    const { assignments } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Check Students' Weekly Assignment</h2>
          <hr />
          <Button
            variant="contained"
            color="default"
            href="/tutor/phoneme/allassign"
          >
            Go back
          </Button>
        </div>
        <Container>
          {assignments ? (
            <div>
              <PhonemeTable rows={assignments.phonemeAssign} />
              <hr />
              <AudioTable rows={assignments.audioAssign} />
              <hr />
              <h3>Old score: {assignments.oldScore}</h3>
              <div className="row">
                <h3>Mark new score: </h3>
                <TextField
                  onChange={(e) =>
                    this.setState({ newScore: parseInt(e.target.value) })
                  }
                />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorAllAssign;
