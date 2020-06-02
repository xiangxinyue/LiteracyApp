import React from "react";
import FluencyIntro from "../../../components/student/fluency/train/trainintro";
import FluencyMain from "../../../components/student/fluency/train/trainpart";
import FluencyHeader from "../../../components/student/fluency/assets/header";
import Paper from "../../../assets/paper";

class FluencyPractise extends React.Component {
  state = {
    understand: false,
  };

  render() {
    const { understand } = this.state;
    return (
      <div>
        <FluencyHeader part="Training Practise" />
        {understand ? (
          <Paper component={FluencyMain} />
        ) : (
          <FluencyIntro
            handleClick={() => this.setState({ understand: !understand })}
          />
        )}
      </div>
    );
  }
}
export default FluencyPractise;
