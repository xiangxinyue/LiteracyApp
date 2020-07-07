import React from "react";
import MeaningIntro from "../../../components/student/meaning/train/trainintro";
import MeaningTrain from "../../../components/student/meaning/train/trainpart";
import MeaningHeader from "../../../components/student/meaning/assets/header";
import { Container } from "@material-ui/core";

class MeaningPractise extends React.Component {
  state = {
    start: false,
  };

  render() {
    const { start } = this.state;
    return (
      <div>
        <MeaningHeader part="Training" />
        <Container>
          {start ? (
            <MeaningTrain />
          ) : (
            <MeaningIntro handleClick={() => this.setState({ start: !start })} />
          )}
        </Container>
      </div>
    );
  }
}
export default MeaningPractise;
