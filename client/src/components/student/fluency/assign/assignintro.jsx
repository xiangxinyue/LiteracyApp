import React from "react";
import Paper from "../../../../assets/paper";
import { Button, Container } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";

class FluencyAssignIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignDone: true,
      newAssign: null,
    };
  }
  componentDidMount = async () => {
    const latestAssign = await axios.get("/api/fluency/evalassign");
    if (latestAssign.data.createAt === undefined) {
      this.setState({ newAssign: false });
    } else {
      this.setState({ newAssign: latestAssign.data.createAt });
    }
  };

  renderAssignButton = () => {
    const { currentUser } = this.props;
    const { newAssign } = this.state;
    let studentAssign = null;
    if (currentUser.fluency_eval_score.length !== 0) {
      studentAssign = currentUser.fluency_eval_score.pop().label;
    }
    switch (newAssign) {
      case null:
        return null;
      case false:
        return <h3>Tutor has not posted new assignment.</h3>;
      default:
        if (!studentAssign || newAssign > studentAssign) {
          return (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={this.props.handleClick}
            >
              Start
            </Button>
          );
        } else {
          return <h3>You have finished this week assignment.</h3>;
        }
    }
  };

  render() {
    const { currentUser } = this.props;
    return (
      <Container>
        <h4 className="text-primary">
          placeholder: Introduction for speed training
        </h4>
        <hr />
        {currentUser ? this.renderAssignButton() : null}
        <Button
          variant="contained"
          color="inherit"
          size="large"
          onClick={() => (window.location = "/student/fluency")}
        >
          Go Back
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FluencyAssignIntro);
