import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";
import {
  Button,
  Container,
  FormControlLabel,
  Radio,
  LinearProgress,
} from "@material-ui/core";
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
    const doc = await axios.get("/api/fluency/student/test");
    const data = doc.data;
    const number = 10;
    await this.setState({
      paragraphs: data.paragraphs.slice(0, number),
      questions: data.questions.slice(0, number),
      choices: data.choices.slice(0, number),
      answers: data.answers.slice(0, number),
      maxNumOfQues: number - 1,
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
    await axios.put("/api/fluency/score", { newSpeed });
    // update the assignment
    await axios.post("/api/fluency/student/test", {
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
    const progress = Math.floor((currentParaNum / maxNumOfQues) * 100);
    return (
      <Container>
        {readDone ? (
          answerred ? (
            currentParaNum < maxNumOfQues ? (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.changeQuestion}
                  size="large"
                >
                  Next Question
                </Button>
                <br />
              </div>
            ) : (
              <div>
                <P1>You have finish all the testing questions!</P1>
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
            <P2>{currPara}</P2>
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
        <br />
        <LinearProgress variant="determinate" value={progress} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FluencyTestPart);
