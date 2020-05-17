import React, { Component } from "react";
import { connect } from "react-redux";
import Process from "../../../assets/process";
import Button from "@material-ui/core/Button";
import axios from "axios";
let time;

class SpeedTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testingState: null,
      time: null,
      paragraph: null,
    };
  }

  componentDidMount = async () => {
    const data = await axios.get("/api/fluency/test/get");
    const paragraph = data.data.paragraph;
    this.setState({ paragraph });
  };

  startTest = async () => {
    await this.setState({ testingState: "start" });
    time = setInterval(() => {
      this.setState({
        time: Math.round((this.state.time + 0.01) * 100) / 100,
      });
    }, 10);
  };

  finishTest = async () => {
    await this.setState({ testingState: "finish" });
    await clearInterval(time);
    const newScore = await Math.floor(
      this.state.paragraph.length / this.state.time
    );
    await axios.post("/api/fluency/score/update", { newScore });
    window.location = "/fluencytrain";
  };

  render() {
    return (
      <div className="container">
        <h2>First: test your reading speed before we get start!</h2>
        <p>
          Instruction: click the start button, time will count, when you finish
          reading the paragraph, click the finish button, the time will stop.
        </p>
        {!this.state.testingState ? (
          <Button variant="contained" color="primary" onClick={this.startTest}>
            Start To Test
          </Button>
        ) : (
          <div>
            {this.state.paragraph ? (
              <div>
                <p>{this.state.paragraph}</p>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.finishTest}
                >
                  Finish
                </Button>
              </div>
            ) : (
              <Process />
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(SpeedTest);
