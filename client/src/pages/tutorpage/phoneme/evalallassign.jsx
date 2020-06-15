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
    const doc = await axios.get("/api/phoneme/evalassign");
    this.setState({ assignments: doc.data });
    console.log(doc.data);
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
          {assignments.length !== 0
            ? assignments.map((assign, index) => {
                if (assign.status === "pending") {
                  return (
                    <TrainCard
                      title={assign.studentName}
                      description={assign.createAt}
                      handleClick={() =>
                        (window.location =
                          "/tutor/phoneme/evalassign/" + assign._id)
                      }
                    />
                  );
                }
              })
            : null}
          <hr />
          <h3>Marked assignments:</h3>
          {assignments.length !== 0
            ? assignments.map((assign, index) => {
                if (assign.status === "done") {
                  return (
                    <TrainCard
                      title={assign.studentName}
                      description={assign.createAt}
                      handleClick={() =>
                        (window.location =
                          "/tutor/phoneme/evalassign/" + assign._id)
                      }
                    />
                  );
                }
              })
            : null}
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorAllAssign;
