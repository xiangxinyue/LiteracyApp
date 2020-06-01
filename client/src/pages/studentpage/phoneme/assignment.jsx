import React from "react";
import PhonemeIntro from "../../../components/student/phoneme/assign/assignintro";
import PhonemePart from "../../../components/student/phoneme/assign/phonemepart";
import AudioPart from "../../../components/student/phoneme/assign/audiopart";
import PhonemeHeader from "../../../components/student/phoneme/assets/header";
import { Container } from "@material-ui/core";

class PhonemeAssign extends React.Component {
  state = {
    start: false,
  };

  render() {
    const { start } = this.state;
    return (
      <div>
        <PhonemeHeader part="Assignment" />
        {start ? (
          <Container>
            <h2>Part 1: phoneme part</h2>
            <PhonemePart />
            <hr />
            <h2>Part 2: sound record</h2>
            <AudioPart />
          </Container>
        ) : (
          <PhonemeIntro handleClick={() => this.setState({ start: !start })} />
        )}
      </div>
    );
  }
}
export default PhonemeAssign;
