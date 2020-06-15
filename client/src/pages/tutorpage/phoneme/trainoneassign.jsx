import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import PhonemeTable from "../../../components/tutor/phoneme/phonemeanswertable";

class PhonemeTutorAllAssign extends React.Component {
  constructor() {
    super();
    this.state = { assignments: null, newScore: 0 };
  }

  componentDidMount = async () => {
    const doc = await axios.get(
      "/api/phoneme/trainassign/" + this.props.match.params.id
    );
    this.setState({ assignments: doc.data });
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
            href="/tutor/phoneme/trainassign"
          >
            Go back
          </Button>
        </div>
        <Container>
          {assignments ? (
            <div>
              <PhonemeTable rows={assignments.phonemeAssign} />
              <hr />
              <h3>Old score: {assignments.oldScore}</h3>
              <h3>New score: {assignments.newScore}</h3>
            </div>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorAllAssign;
