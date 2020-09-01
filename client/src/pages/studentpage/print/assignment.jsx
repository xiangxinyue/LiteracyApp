import React from "react";
import PrintIntro from "../../../components/student/print/assign/trainintro";
import PrintTrain from "../../../components/student/print/assign/trainpart";
import PrintProgress from "../../../components/student/print/assign/train-progress";
import PrintHeader from "../../../components/student/print/assets/header";
import { Container } from "@material-ui/core";
class PhonemePractise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      id: "",
    };
  }

  render() {
    const { start, id } = this.state;
    return (
      <div>
        <Container>
          {start ? (
            id === "" ? (
              <PrintTrain />
            ) : (
              <PrintProgress id={id} />
            )
          ) : (
            <div>
              <PrintHeader part="Training Assignment" />
              <PrintIntro
                handleClick={(id) => this.setState({ start: !start, id })}
              />
            </div>
          )}
        </Container>
      </div>
    );
  }
}
export default PhonemePractise;
