import React from "react";
import FluencyAssignPart from "../../components/assignpart/fluencyassign";

class FluencyAssign extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Speed Training Assignment</h2>
          <hr />
          <h3>You can add, delete data and create new assignment.</h3>
        </div>
        <FluencyAssignPart />
      </div>
    );
  }
}

export default FluencyAssign;
