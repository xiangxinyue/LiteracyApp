import React from "react";
import FluencyIntro from "../../../components/student/fluency/assign/assignintro";
import FluencyMain from "../../../components/student/fluency/assign/assignpart";
import FluencyHeader from "../../../components/student/fluency/assets/header";
import Paper from "../../../assets/paper";
import { Container } from "@material-ui/core";

class FluencyAssignment extends React.Component {
  state = {
    understand: false,
  };

  render() {
    const { understand } = this.state;
    return (
      <div>
        {understand ? (
          <Container style={{ marginTop: "15%" }}>
            <Paper component={FluencyMain} />
          </Container>
        ) : (
          <div>
            <FluencyHeader part="Training Weekly Assignment" />
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
