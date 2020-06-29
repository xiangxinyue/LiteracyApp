import React from "react";
import PrintIntro from "../../../components/student/print/assign/assignintro";
import PrintMain from "../../../components/student/print/assign/assignpart";
import PrintHeader from "../../../components/student/print/assets/header";
import Paper from "../../../assets/paper";

class PrintAssignment extends React.Component {
  state = {
    understand: false,
  };

  render() {
    const { understand } = this.state;
    return (
      <div>
        <PrintHeader part="Weekly Assignment" />
        {understand ? (
          <Paper component={PrintMain} />
        ) : (
          <PrintIntro
            handleClick={() => this.setState({ understand: !understand })}
          />
        )}
      </div>
    );
  }
}
export default PrintAssignment;
