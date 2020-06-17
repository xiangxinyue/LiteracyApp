import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Container, FormControlLabel, Radio } from "@material-ui/core";
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
      studentAnswers: [],
      yourAnswer: null,
      readDone: false,
      answerred: false,
      correctNum: 0,
      speeds: [],
      check: [],
      time: 0,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/fluency/student/testassign");
    const data = doc.data;
    await this.setState({
      paragraphs: data.paragraphs,
      questions: data.questions,
      choices: data.choices,
      answers: data.answers,
      maxNumOfQues: data.paragraphs.length - 1,
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
      const newSpeed = Number((newTime / length).toFixed(3));
      newSpeeds.push(newSpeed);
      newTime = 0;
      this.setState({ readDone: true, speeds: newSpeeds });
    }
  };

  checkAnswer = async (e) => {
    const studentAnswer = e.target.value;
    console.log(studentAnswer);
    const {
      studentAnswers,
      answers,
      currentParaNum,
      score,
      speeds,
      correctNum,
      check,
    } = this.state;
    let newStudentAnswers = studentAnswers;
    newStudentAnswers.push(e.target.value);
    this.setState({ studentAnswers: newStudentAnswers });
    let newCheck = check;
    if (studentAnswer === answers[currentParaNum]) {
      newCheck.push(true);
      this.setState({
        answerred: true,
        score: score + 1,
        correctNum: correctNum + 1,
        check: newCheck,
      });
    } else {
      newCheck.push(false);
      this.setState({ answerred: true, check: newCheck });
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
    const {
      speeds,
      questions,
      paragraphs,
      answers,
      choices,
      studentAnswers,
      check,
    } = this.state;
    let assignment = [];
    for (let i = 0; i < questions.length; i++) {
      assignment.push({
        paragraph: paragraphs[i],
        question: questions[i],
        choices: choices[i],
        answer: answers[i],
        studentAnswer: studentAnswers[i],
        speed: speeds[i],
      });
    }
    // update student's current speed
    let speedSum = 0;
    let num = 0;
    for (let i = 0; i < speeds.length; i++) {
      if (check[i]) {
        speedSum += speeds[i];
        num += 1;
      }
    }
    const newSpeed = Number((speedSum / num).toFixed(3));
    if (newSpeed !== 0) {
      console.log(newSpeed);
      await axios.post("/api/fluency/score/update", { newSpeed });
    }
    // update the assignment
    await axios.post("/api/fluency/student/testassign", {
      assignment,
      averageSpeed: newSpeed,
    });
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
