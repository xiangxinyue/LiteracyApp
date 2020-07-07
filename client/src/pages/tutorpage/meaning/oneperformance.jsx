import React from "react";
import axios from "axios";
import { Button, Container, TextField } from "@material-ui/core";
import LineChart from "../../../assets/assignchart";

class MeaningTutorOnePerformance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { trainScore: null, evalScore: null };
  }

  componentDidMount = async () => {
    const doc = await axios.get(
      "/api/meaning/historyscore/" + this.props.match.params.id
    );
    this.setState({
      trainScore: doc.data.trainScore,
      evalScore: doc.data.evalScore,
    });
  };

  render() {
    const { trainScore, evalScore } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Student' Performance</h2>
          <hr />
          <Button
            variant="contained"
            color="default"
            href="/tutor/meaning/performance"
          >
            Go back
          </Button>
        </div>
        <h3>Training Performance</h3>
        {trainScore ? (
          <LineChart
            data={trainScore}
            title="Training Meaning Part Performance"
            color="#3E517A"
          />
        ) : null}
        <h3>Evaluation Assignment Performance</h3>
        {evalScore ? (
          <LineChart
            data={evalScore}
            title="Training Meaning Part Performance"
            color="#3E517A"
          />
        ) : null}
      </div>
    );
  }
}

export default MeaningTutorOnePerformance;
