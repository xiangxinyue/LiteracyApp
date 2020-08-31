import React from "react";
import { Button, Container } from "@material-ui/core";
import { connect } from "react-redux";

class FluencyAssignIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignDone: true,
      newAssign: null,
    };
  }

  renderButtons = () => {
    const { currentUser } = this.props;
    if (!currentUser) return null;
    switch (currentUser.fluency_progress) {
      case "":
        return (
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginLeft: 20, marginRight: 10 }}
            onClick={() => this.props.handleClick("")}
          >
            Start
          </Button>
        );
      default:
        return (
          <div>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              style={{ marginLeft: 20, marginRight: 10, textTransform: "none" }}
              onClick={() =>
                this.props.handleClick(currentUser.fluency_progress)
              }
            >
              Resume last assignment
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ marginRight: 10, textTransform: "none" }}
              onClick={() => this.props.handleClick("")}
            >
              Start new assignment
            </Button>
          </div>
        );
    }
  };

  render() {
    return (
      <Container>
        <h4 className="text-primary">
          placeholder: Introduction for speed training
        </h4>
        <hr />
        <div className="row">
          {this.renderButtons()}
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

// How to get data from Redux State?
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FluencyAssignIntro);
