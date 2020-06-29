import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import TrainCard from "../../../assets/cards/tutorallassigncard";

class PrintTutorEvalAllAssign extends React.Component {
  constructor() {
    super();
    this.state = { assignments: [] };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/print/evalassign");
    this.setState({ assignments: doc.data });
  };

  render() {
    const { assignments } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Review Students' Evaluation Assignment</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/print">
            Go back
          </Button>
        </div>
        <Container>
          {assignments.map((assign, index) => {
            return (
              <TrainCard
                title={assign.studentName}
                description={assign.createAt}
                handleClick={() =>
                  (window.location = "/tutor/print/evalassign/" + assign._id)
                }
              />
            );
          })}
        </Container>
      </div>
    );
  }
}

export default PrintTutorEvalAllAssign;