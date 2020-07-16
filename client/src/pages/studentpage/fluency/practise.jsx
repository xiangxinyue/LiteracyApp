import React from "react";
import FluencyIntro from "../../../components/student/fluency/train/trainintro";
import FluencyMain from "../../../components/student/fluency/train/trainpart";
import FluencyHeader from "../../../components/student/fluency/assets/header";
import Paper from "../../../assets/paper";
import { Container } from "@material-ui/core";

class FluencyPractise extends React.Component {
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
            <FluencyHeader part="Training Practise" />
            <FluencyIntro
              handleClick={() => this.setState({ understand: !understand })}
            />
          </div>
        )}
      </div>
    );
  }
}
export default FluencyPractise;
