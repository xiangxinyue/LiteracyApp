import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import AssignTable from "../../../components/tutor/fluency/testassigntable";
import LineChart from "../../../assets/assignchart";

class FluencyTutorTestAllAssign extends React.Component {
  constructor(props) {
    super(props);
    this.state = { assignment: null, finalSpeed: null };
  }

  componentDidMount = async () => {
    const doc = await axios.get(
      "/api/fluency/trainassign/" + this.props.match.params.id
    );
    this.setState({ assignment: doc.data });
  };

  renderChart = () => {
    const { assignment } = this.state;
    let data = [];
    assignment.assignment.forEach((assign, index) => {
      data.push({
        label: index,
        value: assign.speed,
      });
    });
    return (
      <LineChart
        data={data}
        title="Testing Reading Speed Chart"
        color="#3E517A"
      />
    );
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
            href="/tutor/fluency/trainassign"
          >
            Go back
          </Button>
        </div>
        {assignment ? (
          <Container>
            <AssignTable rows={assignment.assignment} />
            <hr />
            <div className="main chart-wrapper">{this.renderChart()}</div>
            <h4>Old Speed is {assignment.oldSpeed} millisec / letter</h4>
            <h4>New Speed is {assignment.newSpeed} millisec / letter</h4>
          </Container>
        ) : null}
      </div>
    );
  }
}

export default FluencyTutorTestAllAssign;
