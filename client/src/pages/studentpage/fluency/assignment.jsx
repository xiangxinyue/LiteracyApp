import React from "react";
import FluencyIntro from "../../../components/student/fluency/assign/assignintro";
import FluencyMain from "../../../components/student/fluency/assign/assignpart";
import FluencyHeader from "../../../components/student/fluency/assets/header";
import FluencyFontSize from "../../../components/student/fluency/assets/fontSize";
import Paper from "../../../assets/paper";
import { Container } from "@material-ui/core";

class FluencyAssignment extends React.Component {
  state = {
    understand: false,
    fontSize: 4,
  };

  render() {
    const { understand } = this.state;
    return (
      <div>
        {understand ? (
          <Container style={{ marginTop: "15%" }}>
            <FluencyMain fontSize={this.state.fontSize} />
          </Container>
        ) : (
          <div>
            <FluencyHeader part="Assignment" />
            <FluencyIntro
              handleClick={() => this.setState({ understand: !understand })}
            />
          </div>
        )}
      </div>
    );
  }
}
export default FluencyAssignment;
