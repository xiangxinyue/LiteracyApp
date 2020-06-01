import React from "react";
import FluencyIntro from "../../../components/student/fluency/trainintro";
import FluencyMain from "../../../components/student/fluency/trainpart";
import FluencyHeader from "../../../components/student/fluency/header";
import Paper from "../../../assets/paper";

class FluencyPractise extends React.Component {
  state = {
    understand: false,
  };

  render() {
    const { understand } = this.state;
    return (
      <div>
        <FluencyHeader />
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
