import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import PhonemeTable from "../../../components/tutor/phoneme/phonemeanswertable";

class PhonemeTutorOneAssign extends React.Component {
  constructor() {
    super();
    this.state = { assignments: null, newScore: 0 };
  }

  componentDidMount = async () => {
    const doc = await axios.get(
      "/api/phoneme/test/" + this.props.match.params.id
    );
    this.setState({ assignments: doc.data });
  };

  render() {
    const { assignments } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Check Students' Access Assignment</h2>
          <hr />
          <Button
            variant="contained"
            color="default"
            href="/tutor/phoneme/test"
          >
            Go back
          </Button>
        </div>
        <Container>
          {assignments ? (
            <div>
              <PhonemeTable rows={assignments.phonemeAssign} />
              <hr />
              <div className="row">
                <h4>New Score: {assignments.newScore}</h4>
              </div>
            </div>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorOneAssign;
