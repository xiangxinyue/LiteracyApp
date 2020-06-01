import React from "react";
import Process from "../../../../assets/process";
import PhonemeCard from "../assets/phonemecard";
import { connect } from "react-redux";
import axios from "axios";
import { Container } from "@material-ui/core";

class PhonemeTrainPart extends React.Component {
  constructor() {
    super();
    this.state = {
      assignment: [],
    };
  }

  componentDidMount = async () => {
    const doc = await axios("/api/phoneme/train/gettable");
    await this.setState({
      assignment: doc.data,
    });
  };

  render() {
    const { assignment } = this.state;
    return (
      <Container>
        {assignment.length !== 0 ? (
          <PhonemeCard rows={assignment} />
        ) : (
          <Process />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PhonemeTrainPart);
