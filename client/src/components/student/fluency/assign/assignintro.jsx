import React from "react";
import { Button, Container } from "@material-ui/core";

class FluencyAssignIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignDone: true,
      newAssign: null,
    };
  }

  componentDidMount = async () => {};

  render() {
    return (
      <Container>
        <h4 className="text-primary">
          placeholder: Introduction for speed training
        </h4>
        <hr />
        <div className="row">
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginLeft: 20, marginRight: 10 }}
            onClick={this.props.handleClick}
          >
            Start
          </Button>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            onClick={() => (window.location = "/student/fluency")}
          >
            Go Back
          </Button>
        </div>
      </Container>
    );
  }
}

export default FluencyAssignIntro;
