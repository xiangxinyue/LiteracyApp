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
      studentAnswers: [],
      assignDate: null,
      yourAnswer: null,
      readDone: false,
      answerred: false,
    };
  }

  componentDidMount = async () => {
    const { currentUser } = this.props;
    const doc = await axios("/api/fluency/evalassign");
    const data = doc.data.assignment;
    let paragraphs = [];
    let questions = [];
    let choices = [];
    let answers = [];
    for (let i = 0; i < data.length; i++) {
      paragraphs.push(data[i].paragraph);
      questions.push(data[i].question);
      choices.push(data[i].choices);
      answers.push(data[i].answer);
    }
    await this.setState({
      paragraphs,
      questions,
      choices,
      answers,
      maxNumOfQues: paragraphs.length - 1,
      speed: [currentUser.fluency_curr_score],
      assignDate: doc.data.createAt,
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
    await this.setState({ yourAnswer: e.target.value });
    const {
      yourAnswer,
      answers,
      currentParaNum,
      studentAnswers,
      speed,
    } = this.state;
    let newStudentAnswers = studentAnswers;
    newStudentAnswers.push(yourAnswer);
    const newSpeed = speed;
    const oldSpeed = newSpeed[currentParaNum];
    if (yourAnswer === answers[currentParaNum]) {
      const addNewSpeed = Number((oldSpeed * 1.02).toFixed(3));
      newSpeed.push(addNewSpeed);
      this.setState({
        answerred: true,
        score: this.state.score + 1,
        studentAnswers: newStudentAnswers,
        speed: newSpeed,
      });
    } else {
      const addNewSpeed = Number((oldSpeed * 0.98).toFixed(3));
      newSpeed.push(addNewSpeed);
      this.setState({
        answerred: true,
        studentAnswers: newStudentAnswers,
        speed: newSpeed,
      });
    }
    console.log(speed);
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
    const {
      score,
      maxNumOfQues,
      speed,
      assignDate,
      questions,
      paragraphs,
      choices,
      answers,
      studentAnswers,
    } = this.state;
    const newSpeed = speed.pop();
    // update new score
    await axios.post("/api/fluency/score/update", { newSpeed });
    // update history evaluation score
    await axios.post("/api/fluency/historyscore/update", {
      newSpeed,
      assignDate,
    });
    // record assign data into database
    let assignment = [];
    for (let i = 0; i < questions.length; i++) {
      assignment.push({
        paragraph: paragraphs[i],
        question: questions[i],
        choices: choices[i],
        answer: answers[i],
        studentAnswer: studentAnswers[i],
        speed: speed[i],
      });
    }
    await axios.post("/api/fluency/evalassign", {
      assignment,
      score,
      newSpeed,
      oldSpeed: speed[0],
    });
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
