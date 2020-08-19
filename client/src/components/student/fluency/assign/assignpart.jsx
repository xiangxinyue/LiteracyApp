import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Container, FormControlLabel, Radio } from "@material-ui/core";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";
import Process from "../../../../assets/process";
import $ from "jquery";
let time;

class FluencyAssignPart extends Component {
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
      yourAnswer: null,
      readDone: false,
      answerred: false,
    };
  }

  componentDidMount = async () => {
    const { currentUser } = this.props;
    const doc = await axios.get("/api/fluency/student/assign");
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
    const { answers, currentParaNum, speed, studentAnswers } = this.state;
    const answer = e.target.value;
    const newSpeed = speed;
    const oldSpeed = newSpeed[currentParaNum];
    if (answer === answers[currentParaNum]) {
      const addNewSpeed = Number((oldSpeed * 0.98).toFixed(3));
      newSpeed.push(addNewSpeed);
      this.setState({
        answerred: true,
        score: this.state.score + 1,
        speed: newSpeed,
      });
    } else {
      const addNewSpeed = Number((oldSpeed * 1.08).toFixed(3));
      newSpeed.push(addNewSpeed);
      this.setState({ answerred: true, speed: newSpeed });
    }
    const newStudentAnsers = studentAnswers;
    newStudentAnsers.push(answer);
    this.setState({
      studentAnswers: newStudentAnsers,
    });
  };

  changeQuestion = async () => {
    const { currentParaNum, paragraphs } = this.state;
    await this.setState({ currentParaNum: currentParaNum + 1 });
    await this.setState({
      currPara: paragraphs[this.state.currentParaNum],
      readDone: false,
      answerred: false,
    });
    const sentenceArray = await this.state.currPara.split("");
    await this.setState({ currParaArray: sentenceArray });
    await this.setState({ length: this.state.currParaArray.length });

    this.startReading();
  };

  finishTrain = async () => {
    const {
      speed,
      questions,
      paragraphs,
      answers,
      choices,
      studentAnswers,
    } = this.state;
    const newSpeed = speed.pop();
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
    // create the practice assignment
    await axios.post("/api/fluency/student/assign", {
      assignment,
      newSpeed,
    });
    // update fluency current score
    await axios.put("/api/fluency/score", { newSpeed });
    // update fluency practice history score
    await axios.post("/api/fluency/assign/historyscore", { newSpeed });
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
      <Container>
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
                <P1>You have finish all the training questions!</P1>
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
              <P1>{questions[currentParaNum]}</P1>
              <FormControlLabel
                value={choices[currentParaNum][0]}
                label={choices[currentParaNum][0]}
                control={<Radio />}
                onChange={this.checkAnswer}
              />
              <br />
              <FormControlLabel
                value={choices[currentParaNum][1]}
                label={choices[currentParaNum][1]}
                control={<Radio />}
                onChange={this.checkAnswer}
              />
              <br />
              <FormControlLabel
                value={choices[currentParaNum][2]}
                label={choices[currentParaNum][2]}
                control={<Radio />}
                onChange={this.checkAnswer}
              />
              <br />
              <FormControlLabel
                value={choices[currentParaNum][3]}
                label={choices[currentParaNum][3]}
                control={<Radio />}
                onChange={this.checkAnswer}
              />
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
                        <P2>{letter}</P2>
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
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FluencyAssignPart);
