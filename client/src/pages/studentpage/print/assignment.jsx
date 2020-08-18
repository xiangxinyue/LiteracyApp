import React from "react";
import PrintIntro from "../../../components/student/print/assign/trainintro";
import PrintTrain from "../../../components/student/print/assign/trainpart";
import PrintHeader from "../../../components/student/print/assets/header";
import { Container } from "@material-ui/core";
class PhonemePractise extends React.Component {
  state = {
    start: false,
  };

  render() {
    const { start } = this.state;
    return (
      <div>
        <PrintHeader part="Training Assignment" />
        <Container>
          {start ? (
            <PrintTrain />
          ) : (
            <PrintIntro handleClick={() => this.setState({ start: !start })} />
          )}
        </Container>
      </div>
    );
  }
}
export default PhonemePractise;
