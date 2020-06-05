import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import TrainCard from "../../../assets/cards/tutorallassigncard";

class PhonemeTutorAllAssign extends React.Component {
  constructor() {
    super();
    this.state = { assignments: [] };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/phoneme/allassign");
    this.setState({ assignments: doc.data });
  };

  render() {
    const { assignments } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Check Students' Weekly Assignment</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/phoneme">
            Go back
          </Button>
        </div>
        <Container>
          <h3>Pending assignments:</h3>
          {assignments.map((assign, index) => {
            if (assign.status === "pending") {
              return (
                <TrainCard
                  title={assign.studentName}
                  description={assign.createAt}
                  handleClick={() =>
                    (window.location = "/tutor/phoneme/allassign/" + assign._id)
                  }
                />
              );
            }
          })}
          <hr />
          <h3>Marked assignments:</h3>
          {assignments.map((assign, index) => {
            if (assign.status === "done") {
              return (
                <TrainCard
                  title={assign.studentName}
                  description={assign.createAt}
                  handleClick={() =>
                    (window.location = "/tutor/phoneme/allassign/" + assign._id)
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

export default PhonemeTutorAllAssign;
