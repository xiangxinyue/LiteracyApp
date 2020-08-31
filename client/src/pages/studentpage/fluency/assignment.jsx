import React from "react";
import FluencyIntro from "../../../components/student/fluency/assign/assignintro";
import FluencyMain from "../../../components/student/fluency/assign/assignpart";
import FluencyProgress from "../../../components/student/fluency/assign/assign-progress";
import FluencyHeader from "../../../components/student/fluency/assets/header";
import { Container } from "@material-ui/core";

class FluencyAssignment extends React.Component {
  state = {
    understand: false,
    id: "",
  };

  render() {
    const { understand, id } = this.state;
    return (
      <div>
        {understand ? (
          <Container>
            {id === "" ? <FluencyMain /> : <FluencyProgress progress_id={id} />}
          </Container>
        ) : (
          <div>
            <FluencyHeader part="Training Assignment" />
            <FluencyIntro
              handleClick={(id) =>
                this.setState({ understand: !understand, id })
              }
            />
          </div>
        )}
      </div>
    );
  }
}
export default FluencyAssignment;
