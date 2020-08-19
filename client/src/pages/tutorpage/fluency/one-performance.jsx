import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import LineChart from "../../../assets/assignchart";

class FluencyTutorTestAllAssign extends React.Component {
  constructor(props) {
    super(props);
    this.state = { assignScore: null };
  }

  componentDidMount = async () => {
    const doc = await axios.get(
      "/api/fluency/historyscore/" + this.props.match.params.id
    );
    this.setState({
      assignScore: doc.data.assignScore,
    });
  };

  render() {
    const { assignScore } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Student' Performance</h2>
          <hr />
          <Button
            variant="contained"
            color="default"
            href="/tutor/fluency/performance"
          >
            Go back
          </Button>
        </div>
        {assignScore ? (
          <LineChart
            data={assignScore}
            title="Training Reading Speed Performance"
            color="#3E517A"
          />
        ) : null}
      </div>
    );
  }
}

export default FluencyTutorTestAllAssign;
