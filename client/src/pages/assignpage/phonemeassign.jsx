import React from "react";
import PhonemeAssignPart from "../../components/assignpart/phonemeassign";

class FluencyAssign extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Sound Training Assignment</h2>
          <hr />
          <h3>You can add, delete data and create new assignment.</h3>
        </div>
        <PhonemeAssignPart />
      </div>
    );
  }
}

export default FluencyAssign;
