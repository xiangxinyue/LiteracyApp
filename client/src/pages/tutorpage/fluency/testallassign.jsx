import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import TrainCard from "../../../assets/cards/tutorallassigncard";

class FluencyTutorTestAllAssign extends React.Component {
  constructor() {
    super();
    this.state = { assignments: [] };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/fluency/test/assign/getall");
    this.setState({ assignments: doc.data });
  };

  render() {
    const { assignments } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Review Students' Testing Assignment</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/fluency">
            Go back
          </Button>
        </div>
        <Container>
          <h3>New Testing Assignments:</h3>
          {assignments.map((assign, index) => {
            if (assign.status === "pending") {
              return (
                <TrainCard
                  title={assign.studentName}
                  description={assign.createAt}
                  handleClick={() =>
                    (window.location =
                      "/tutor/fluency/testassign/" + assign._id)
                  }
                />
              );
            }
          })}
          <hr />
          <h3>Reviewed Testing Assignments:</h3>
          {assignments.map((assign, index) => {
            if (assign.status === "done") {
              return (
                <TrainCard
                  title={assign.studentName}
                  description={assign.createAt}
                  handleClick={() =>
                    (window.location =
                      "/tutor/fluency/testassign/" + assign._id)
                  }
                />
              );
            }
          })}
        </Container>
      </div>
    );
  }
}

export default FluencyTutorTestAllAssign;
