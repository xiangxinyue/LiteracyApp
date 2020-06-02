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
    const latestAssign = await axios.get("/api/fluency/assign/latest");
    this.setState({ newAssign: latestAssign.data.createAt });
  };

  checkAssign = () => {
    const { currentUser } = this.props;
    const { newAssign } = this.state;
    const studentAssign = currentUser.fluency_score.dates.pop();
    if (!studentAssign || newAssign > studentAssign) {
      this.setState({ assignDone: false });
    }
  };

  render() {
    const { currentUser } = this.props;
    const { assignDone } = this.state;
    return (
      <Container>
        <h3 className="text-primary">
          This is the introduction of Speed Assignment.
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

        {assignDone ? (
          <div>
            {currentUser ? this.checkAssign() : null}
            <h3>You have finished this week assignment.</h3>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.props.handleClick}
          >
            Start
          </Button>
        )}

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
