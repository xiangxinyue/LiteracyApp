import React from "react";
import axios from "axios";
import { Button, Container, TextField } from "@material-ui/core";
import AssignTable from "../../../components/tutor/fluency/evalassigntable";

class FluencyTutorTestAllAssign extends React.Component {
  constructor(props) {
    super(props);
    this.state = { assignment: null, finalSpeed: null };
  }

  componentDidMount = async () => {
    const doc = await axios.get(
      "/api/fluency/assign/getone/" + this.props.match.params.id
    );
    this.setState({ assignment: doc.data });
    console.log(doc.data);
  };

  render() {
    const { assignment } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Review Student' Testing Assignment</h2>
          <hr />
          <Button
            variant="contained"
            color="default"
            href="/tutor/fluency/evalassign"
          >
            Go back
          </Button>
        </div>
        {assignment ? (
          <Container>
            <AssignTable rows={assignment.assignment} />
            <hr />
            <h3>Summary:</h3>
            <h4>The student's assignment score is {assignment.score}</h4>
            <h4>
              The student's old reading speed is {assignment.oldSpeed} millisec
              / letter
            </h4>
            <h4>
              The student's New reading speed is {assignment.newSpeed} millisec
              / letter
            </h4>
          </Container>
        ) : null}
      </div>
    );
  }
}

export default FluencyTutorTestAllAssign;
