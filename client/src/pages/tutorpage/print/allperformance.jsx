import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import TrainCard from "../../../assets/cards/tutorallassigncard";

class PrintTutorAllPerformance extends React.Component {
  constructor() {
    super();
    this.state = { students: [] };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/student/getall");
    this.setState({ students: doc.data });
  };

  render() {
    const { students } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Review Students' Print Performance</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/print">
            Go back
          </Button>
        </div>
        <Container>
          {students.map((student, index) => {
            return (
              <TrainCard
                key={index}
                title={student.displayName}
                description={student.email}
                handleClick={() =>
                  (window.location = "/tutor/print/performance/" + student._id)
                }
              />
            );
          })}
        </Container>
      </div>
    );
  }
}

export default PrintTutorAllPerformance;
