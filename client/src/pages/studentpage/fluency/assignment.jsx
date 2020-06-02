import React from "react";
import FluencyIntro from "../../../components/student/fluency/assign/assignintro";
import FluencyMain from "../../../components/student/fluency/assign/assignpart";
import FluencyHeader from "../../../components/student/fluency/assets/header";
import Paper from "../../../assets/paper";

class FluencyAssignment extends React.Component {
  state = {
    understand: false,
  };

  render() {
    const { understand } = this.state;
    return (
      <div>
        <FluencyHeader part="Training Weekly Assignment" />
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
export default FluencyAssignment;
