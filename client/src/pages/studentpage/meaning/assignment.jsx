import React from "react";
import MeaningIntro from "../../../components/student/meaning/assign/assignintro";
import MeaningMain from "../../../components/student/meaning/assign/assignpart";
import MeaningHeader from "../../../components/student/meaning/assets/header";
import Paper from "../../../assets/paper";

class MeaningAssignment extends React.Component {
  state = {
    understand: false,
  };

  render() {
    const { understand } = this.state;
    return (
      <div>
        <MeaningHeader part="Weekly Assignment" />
        {understand ? (
          <Paper component={MeaningMain} />
        ) : (
          <MeaningIntro
            handleClick={() => this.setState({ understand: !understand })}
          />
        )}
      </div>
    );
  }
}
export default MeaningAssignment;
