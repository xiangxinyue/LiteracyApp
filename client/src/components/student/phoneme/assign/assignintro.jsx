import React from "react";
import { Button, Container } from "@material-ui/core";
import { connect } from "react-redux";
class PhonemeAssignIntro extends React.Component {
  constructor(props) {
    super(props);
  }
  renderButtons = () => {
    const { currentUser } = this.props;
    if (!currentUser) return null;
    switch (currentUser.phoneme_progress) {
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
                this.props.handleClick(currentUser.phoneme_progress)
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
          Now, you will get to practice your knowledge about sound patterns by
          completing exercises. There are different types of exercises, like
          fill in the blanks, multiple choice questions. Please read carefully
          and answer as best as you can.
        </h4>
        <hr />
        <div className="row">
          {this.renderButtons()}
          <Button
            variant="contained"
            color="inherit"
            size="large"
            onClick={() => (window.location = "/student/phoneme")}
          >
            Go Back
          </Button>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PhonemeAssignIntro);
