import React from "react";
import { Button, Container } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";

class MeaningAssignIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignDone: true,
      newAssign: null,
    };
  }
  componentDidMount = async () => {
    const latestAssign = await axios.get("/api/print/eval");
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
    if (currentUser.print_eval_score.length !== 0) {
      studentAssign = currentUser.print_eval_score.pop().label;
    }
    console.log(currentUser);
    console.log("student", studentAssign);
    console.log("assign", newAssign);
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
        <h3 className="text-primary">
          This is the introduction of Meaning Assignment.
        </h3>
        <h4>
          Instructions: Watch the introduction video first, then click the start
          button. Read the words as fast as possible. When you finish click the
          finish button.
        </h4>
        <iframe
          width="740"
          height="430"
          src="https://www.youtube.com/embed/rDg4S6jxLJI"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style={{ marginTop: 20 }}
        ></iframe>
        <hr />
        {currentUser ? this.renderAssignButton() : null}
        <Button
          variant="contained"
          color="inherit"
          size="large"
          onClick={() => (window.location = "/student/print")}
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

export default connect(mapStateToProps)(MeaningAssignIntro);
