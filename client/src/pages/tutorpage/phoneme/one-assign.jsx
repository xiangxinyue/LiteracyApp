import React from "react";
import axios from "axios";
import { Button, Container, TextField } from "@material-ui/core";
import AudioTable from "../../../components/tutor/phoneme/audioanswertable";
import PhonemeTable from "../../../components/tutor/phoneme/phonemeanswertable";

class PhonemeTutorAllAssign extends React.Component {
  constructor() {
    super();
    this.state = { assignment: null, newScore: 0 };
  }

  componentDidMount = async () => {
    const doc = await axios.get(
      "/api/phoneme/assign/" + this.props.match.params.id
    );
    console.log(doc.data);
    this.setState({ assignment: doc.data });
  };

  handleSubmit = async () => {
    const { assignment, newScore } = this.state;
    await axios.put("/api/phoneme/score", {
      newScore,
      studentId: assignment.studentId,
      assignId: assignment._id,
      assignDate: assignment.createAt,
    });
    window.location = "/tutor/phoneme/assign";
  };

  render() {
    const { assignment } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Check Students' Weekly Assignment</h2>
          <hr />
          <Button
            variant="contained"
            color="default"
            href="/tutor/phoneme/assign"
          >
            Go back
          </Button>
        </div>
        <Container>
          {assignment ? (
            <div>
              <PhonemeTable rows={assignment.phonemeAssign} />
              <hr />
              <AudioTable rows={assignment.audioAssign} />
              <hr />
              <h3>Old score: {assignment.oldScore}</h3>
              <div className="row">
                <h3>Mark new score: </h3>
                <TextField
                  autoComplete="off"
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
