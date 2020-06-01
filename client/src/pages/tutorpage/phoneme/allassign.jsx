import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import TrainCard from "../../../assets/cards/audiolookupcard";

class PhonemeTutorAllAssign extends React.Component {
  constructor() {
    super();
    this.state = { assignments: [], showAssign: null };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/phoneme/audioassign/all");
    this.setState({ assignments: doc.data });
  };

  render() {
    const { assignments, showAssign } = this.state;
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
          {assignments.map((assign, index) => {
            return (
              <TrainCard
                title={assign.studentName}
                description={assign.audioAssignId}
                handleClick={() =>
                  (window.location = "/tutor/phoneme/allassign/" + assign._id)
                }
              />
            );
          })}
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorAllAssign;