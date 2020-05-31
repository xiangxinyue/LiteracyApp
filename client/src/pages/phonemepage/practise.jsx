import React from "react";
import PhonemeIntro from "../../components/phoneme/trainintro";
import PhonemeTrain from "../../components/phoneme/trainpart";
import PhonemeHeader from "../../components/phoneme/header";

class FluencyPractise extends React.Component {
  state = {
    start: false,
  };

  render() {
    const { start } = this.state;
    return (
      <div>
        <PhonemeHeader />
        {start ? (
          <PhonemeTrain />
        ) : (
          <PhonemeIntro handleClick={() => this.setState({ start: !start })} />
        )}
      </div>
    );
  }
}
export default FluencyPractise;
