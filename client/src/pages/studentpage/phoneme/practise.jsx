import React from "react";
import PhonemeIntro from "../../../components/student/phoneme/train/trainintro";
import PhonemeTrain from "../../../components/student/phoneme/train/trainpart";
import PhonemeHeader from "../../../components/student/phoneme/assets/header";

class PhonemePractise extends React.Component {
  state = {
    start: false,
  };

  render() {
    const { start } = this.state;
    return (
      <div>
        <PhonemeHeader part="Training" />
        {start ? (
          <PhonemeTrain />
        ) : (
          <PhonemeIntro handleClick={() => this.setState({ start: !start })} />
        )}
      </div>
    );
  }
}
export default PhonemePractise;
