import React, { Component } from "react";
import { connect } from "react-redux";
import Process from "../../assets/process";
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
    window.location = "/student/fluency";
  };

  render() {
    return (
      <div className="container">
        {!this.state.testingState ? (
          <div>
            <h2 className="text-primary">
              Test your reading speed before we start
            </h2>
            <h4>
              Instructions: Watch the introduction video first, then click the
              start button. Read the words as fast as possible. When you finish
              click the finish button.
            </h4>
            <iframe
              width="600"
              height="340"
              src="https://www.youtube.com/embed/rDg4S6jxLJI"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <hr />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={this.startTest}
            >
              Start
            </Button>
          </div>
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
