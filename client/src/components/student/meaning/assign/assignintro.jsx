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
    const latestAssign = await axios.get("/api/meaning/eval");
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
        <h4 className="text-primary">
          Now, you will get to practice your knowledge about sound units (or
          morphemes) by completing exercises. There are different types of
          exercises, like fill in the blanks, multiple choice questions. Please
          read carefully and answer as best as you can.
        </h4>
        <hr />
        {currentUser ? this.renderAssignButton() : null}
        <Button
          variant="contained"
          color="inherit"
          size="large"
          onClick={() => (window.location = "/student/meaning")}
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
