import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";
import Process from "../../../../assets/process";
import $ from "jquery";
let time;

class FluencyTrainingPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: [],
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
    };
  }

  componentDidMount = async () => {
    const { currentUser } = this.props;
    const doc = await axios("/api/fluency/train/get");
    const data = doc.data;
    await this.setState({
      paragraphs: data.paragraphs,
      questions: data.questions,
      choices: data.choices,
      answers: data.answers,
      maxNumOfQues: data.paragraphs.length - 1,
      speed: [currentUser.fluency_curr_score],
    });
    await this.setState({
      currPara: this.state.paragraphs[this.state.currentParaNum],
    });
    const sentenceArray = await this.state.currPara.split("");
    await this.setState({ currParaArray: sentenceArray });
    await this.setState({ length: this.state.currParaArray.length });
    this.startReading();
  };

  startReading = async () => {
    let index = 0;
    const { speed, length, currentParaNum } = this.state;
    console.log(speed);
    let currSpeed = speed[currentParaNum];
    await setTimeout(() => {
      time = setInterval(async () => {
        if (index < length) {
          await $(`.${index}`).css("color", "white"); // "#e9ecef"
          index += 1;
        } else {
          await this.setState({ readDone: true });
          clearInterval(time);
        }
      }, currSpeed);
    }, 1000);
  };

  checkAnswer = async (e) => {
    const { yourAnswer, answers, currentParaNum, speed } = this.state;
    await this.setState({ yourAnswer: e.target.value });
    const newSpeed = speed;
    const oldSpeed = newSpeed[currentParaNum];
    if (yourAnswer === answers[currentParaNum]) {
      const addNewSpeed = Math.round(oldSpeed * 1.02);
      newSpeed.push(addNewSpeed);
      this.setState({
        answerred: true,
        score: this.state.score + 1,
        speed: newSpeed,
      });
    } else {
      const addNewSpeed = Math.round(oldSpeed * 0.98);
      newSpeed.push(addNewSpeed);
      this.setState({ answerred: true, speed: newSpeed });
    }
  };

  changeQuestion = async () => {
    const { currentParaNum, paragraphs, currPara, currParaArray } = this.state;
    await this.setState({
      currentParaNum: currentParaNum + 1,
      currPara: paragraphs[currentParaNum],
      readDone: false,
      answerred: false,
    });
    const sentenceArray = await currPara.split("");
    await this.setState({ currParaArray: sentenceArray });
    await this.setState({ length: currParaArray.length });

    this.startReading();
  };

  finishTrain = async () => {
    const { speed } = this.state;
    const newSpeed = speed.pop();
    await axios.post("/api/fluency/score/update", { newSpeed });
    window.location = "/student/fluency";
  };

  render() {
    const {
      readDone,
      score,
      answerred,
      currentParaNum,
      maxNumOfQues,
      questions,
      choices,
      currParaArray,
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
                <h2>You have finish all the training questions!</h2>
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
            {currParaArray.length !== 0 ? (
              <div className="row" style={{ paddingLeft: 30, fontSize: 20 }}>
                {currParaArray.map((letter, index) => {
                  if (letter === " ") {
                    return (
                      <div className={index} key={index}>
                        &nbsp;
                      </div>
                    );
                  } else {
                    return (
                      <div className={index} key={index}>
                        <h4>{letter}</h4>
                      </div>
                    );
                  }
                })}
              </div>
            ) : (
              <Process />
            )}
          </div>
        )}
        <hr />
        <h5>Your score is: {score}</h5>
        <h5>
          The process: {currentParaNum + 1} / {maxNumOfQues + 1}
        </h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FluencyTrainingPart);
