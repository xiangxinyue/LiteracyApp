import React from "react";
import MeaningIntro from "../../../components/student/meaning/assign/trainintro";
import MeaningTrain from "../../../components/student/meaning/assign/trainpart";
import MeaningProgress from "../../../components/student/meaning/assign/train-progress";
import MeaningHeader from "../../../components/student/meaning/assets/header";
import { Container } from "@material-ui/core";

class MeaningPractise extends React.Component {
  state = {
    start: false,
    id: "",
  };

  render() {
    const { start, id } = this.state;
    return (
      <div>
        <Container>
          {start ? (
            id === "" ? (
              <MeaningTrain />
            ) : (
              <MeaningProgress id={id} />
            )
          ) : (
            <div>
              <MeaningHeader part="Training Assignment" />
              <MeaningIntro
                handleClick={(id) => this.setState({ start: !start, id })}
              />
            </div>
          )}
        </Container>
      </div>
    );
  }
}
export default MeaningPractise;
