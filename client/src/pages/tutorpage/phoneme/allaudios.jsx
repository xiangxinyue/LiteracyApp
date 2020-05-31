import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import TrainCard from "../../../assets/cards/audiolookupcard";
import AudioTable from "../../../assets/table/audioloopuptable";

class PhonemeTutorAudioAll extends React.Component {
  constructor() {
    super();
    this.state = { assignments: [], showAssign: null };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/phoneme/audioassign/all");
    this.setState({ assignments: doc.data });
  };

  handleSingleCheck = (id) => {
    const { assignments } = this.state;
    const showAssign = assignments.filter((assign) => assign._id === id);
    console.log(showAssign[0].assignment);
    this.setState({ showAssign: showAssign[0].assignment });
  };

  render() {
    const { assignments, showAssign } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Check Students' Audio assignment</h2>
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
                handleClick={() => this.handleSingleCheck(assign._id)}
              />
            );
          })}
          <h2>Details of the chosen assign: </h2>
          {showAssign ? <AudioTable rows={showAssign} /> : null}
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorAudioAll;
