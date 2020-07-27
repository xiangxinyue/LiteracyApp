import React from "react";
import FluencyIntro from "../../../components/student/fluency/train/trainintro";
import FluencyMain from "../../../components/student/fluency/train/trainpart";
import FluencyHeader from "../../../components/student/fluency/assets/header";
import FluencyFontSize from "../../../components/student/fluency/assets/fontSize";
import Paper from "../../../assets/paper";
import { Container } from "@material-ui/core";

class FluencyPractise extends React.Component {
  state = {
    understand: false,
    fontSizeChose: false,
    fontSize: 4,
  };

  render() {
    const { understand, fontSizeChose } = this.state;
    return (
      <div>
        {understand ? (
          fontSizeChose ? (
            <Container style={{ marginTop: "15%" }}>
              <FluencyMain fontSize={this.state.fontSize} />
            </Container>
          ) : (
            <Container style={{ marginTop: "15%" }}>
              <FluencyFontSize
                newFont={(newFont) => this.setState({ fontSize: newFont })}
                start={() => this.setState({ fontSizeChose: true })}
              />
            </Container>
          )
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
