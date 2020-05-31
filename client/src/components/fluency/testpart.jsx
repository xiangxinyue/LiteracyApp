import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";
let timer;
let newTime = 0;

class FluencyTestPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      currentParaNum: 0,
      maxNumOfQues: 0,
      length: 0,
      currPara: null,
      currParaArray: [],
      paragraphs: [],
      questions: [],
      choices: [],
      answers: [],
      yourAnswer: null,
      readDone: false,
      answerred: false,
      speeds: [],
      time: 0,
    };
  }

  componentDidMount = async () => {
    const doc = await axios("/api/fluency/test/get");
    const data = doc.data;
    await this.setState({
      paragraphs: data.paragraphs,
      questions: data.questions,
      choices: data.choices,
      answers: data.answers,
      maxNumOfQues: data.paragraphs.length - 1,
      speed: this.props.currentUser.fluency_curr_score,
    });
    await this.setState({
      currPara: this.state.paragraphs[this.state.currentParaNum],
    });
    const sentenceArray = await this.state.currPara.split("");
    await this.setState({ currParaArray: sentenceArray });
    await this.setState({
      length: this.state.currParaArray.length,
      readDone: true,
    });
    this.toggleReading();
  };

  toggleReading = async () => {
    const { readDone, speeds, length } = this.state;
    if (readDone) {
      await this.setState({ readDone: false });
      timer = setInterval(() => (newTime += 1), 1);
    } else {
      clearInterval(timer);
      let newSpeeds = speeds;
      const newSpeed = newTime / length;
      newSpeeds.push(newSpeed);
      newTime = 0;
      this.setState({ readDone: true, speeds: newSpeeds });
    }
  };

  checkAnswer = async (e) => {
    await this.setState({ yourAnswer: e.target.value });
    if (
      this.state.yourAnswer === this.state.answers[this.state.currentParaNum]
    ) {
      this.setState({
        answerred: true,
        score: this.state.score + 1,
      });
    } else {
      this.setState({ answerred: true });
    }
  };

  changeQuestion = async () => {
    await this.setState({
      currentParaNum: this.state.currentParaNum + 1,
      currPara: this.state.paragraphs[this.state.currentParaNum],
      answerred: false,
    });
    const sentenceArray = await this.state.currPara.split("");
    await this.setState({ currParaArray: sentenceArray });
    await this.setState({ length: this.state.currParaArray.length });
    this.toggleReading();
  };

  finishTrain = async () => {
    const { speeds } = this.state;
    let sum = 0;
    speeds.forEach((speed) => (sum += speed));
    const newSpeed = Math.round(sum / speeds.length);
    await axios.post("/api/fluency/score/update", { newSpeed });
    window.location = "/student/fluency";
  };

  render() {
    const {
      readDone,
      answerred,
      currentParaNum,
      maxNumOfQues,
      questions,
      choices,
      currPara,
    } = this.state;
    return (
      <div>
        {readDone ? (
          answerred ? (
            currentParaNum < maxNumOfQues ? (
              <Button
                variant="contained"
                color="primary"
                onClick={this.changeQuestion}
                size="large"
              >
                Next Question
              </Button>
            ) : (
              <div>
                <h2>You have finish all the testing questions!</h2>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.finishTrain}
                  size="large"
                >
                  Good Job!
                </Button>
              </div>
            )
          ) : (
            <div>
              <h3>{questions[currentParaNum]}</h3>
              {choices[currentParaNum].map((choice, index) => (
                <div className="row">
                  <div className="col-3"></div>
                  <div className="row col-6">
                    <input
                      type="radio"
                      key={index}
                      value={choice}
                      defaultChecked={false}
                      onClick={this.checkAnswer}
                    />
                    &nbsp;&nbsp;
                    <h4>{choice}</h4>
                  </div>
                  <div className="col-3"></div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div>
            <h3>{currPara}</h3>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={this.toggleReading}
            >
              Finish
            </Button>
          </div>
        )}
        <hr />
        <h5>Your score is: {this.state.score}</h5>
        <h5>
          The process: {this.state.currentParaNum + 1} /{" "}
          {this.state.maxNumOfQues + 1}
        </h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FluencyTestPart);
