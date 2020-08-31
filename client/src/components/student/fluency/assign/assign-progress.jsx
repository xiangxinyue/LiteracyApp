import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Button,
  Container,
  FormControlLabel,
  Radio,
  LinearProgress,
} from "@material-ui/core";
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
      index: 0,
      length: 0,
      currPara: "",
      currParaArray: [],
      paragraphs: [],
      questions: [],
      choices: [],
      answers: [],
      studentAnswers: [],
      yourAnswer: "",
      readDone: false,
      answerred: false,
    };
  }

  componentDidMount = async () => {
    const { progress_id } = this.props;
    const doc = await axios.get("/api/fluency/student/progress/" + progress_id);
    const {
      speed,
      score,
      index,
      length,
      currPara,
      currParaArray,
      paragraphs,
      questions,
      choices,
      answers,
      studentAnswers,
    } = doc.data;
    this.setState({
      speed,
      score,
      index,
      length,
      currPara,
      currParaArray,
      paragraphs,
      questions,
      choices,
      answers,
      studentAnswers,
    });
    this.startReading();
  };

  startReading = async () => {
    const { speed, length, index } = this.state;
    let currSpeed = speed[index];
    let pointer = 0;
    await setTimeout(() => {
      time = setInterval(async () => {
        if (pointer < length) {
          await $(`.${pointer}`).css("color", "white"); // "#e9ecef"
          pointer += 1;
        } else {
          await this.setState({ readDone: true });
          clearInterval(time);
        }
      }, currSpeed);
    }, 1000);
  };

  checkAnswer = async (e) => {
    const {
      answers,
      index,
      speed,
      studentAnswers,
      paragraphs,
      questions,
      choices,
    } = this.state;
    const answer = e.target.value;
    const newSpeed = speed;
    const oldSpeed = newSpeed[index];
    if (answer === answers[index]) {
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
      paragraphs.push(paragraphs[index]);
      questions.push(questions[index]);
      choices.push(choices[index]);
      answers.push(answers[index]);
      this.setState({
        answerred: true,
        speed: newSpeed,
        paragraphs,
        questions,
        choices,
        answers,
      });
    }
    const newStudentAnsers = studentAnswers;
    newStudentAnsers.push(answer);
    this.setState({
      studentAnswers: newStudentAnsers,
    });
  };

  changeQuestion = async () => {
    const { index, paragraphs } = this.state;
    await this.setState({ index: index + 1 });
    await this.setState({
      currPara: paragraphs[this.state.index],
      readDone: false,
      answerred: false,
    });
    const sentenceArray = await this.state.currPara.split("");
    await this.setState({ currParaArray: sentenceArray });
    await this.setState({ length: this.state.currParaArray.length });

    this.startReading();
  };

  handleSaveAssignment = async () => {
    // 1. Clean the student last progress and delete the old progress
    const doc1 = await axios.put("/api/fluency/student/progress", {
      newProgress: "",
    });
    if (doc1.data !== "") {
      await axios.delete("/api/fluency/student/progress/" + doc1.data);
    }

    // 2. save progress into database and save progress_id into student database
    const doc2 = await axios.post("/api/fluency/student/progress", this.state);
    await axios.put("/api/fluency/student/progress", {
      newProgress: doc2.data._id,
    });
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
    // update fluency practice history score
    await axios.put("/api/fluency/score", { newSpeed });
    window.location = "/student/fluency";
  };

  render() {
    const {
      readDone,
      score,
      answerred,
      index,
      questions,
      choices,
      currParaArray,
    } = this.state;
    const progress = ((index + 1) / questions.length) * 100;
    console.log(this.state);
    return (
      <div>
        <Container style={{ marginTop: "5%" }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: 20 }}
            onClick={this.handleSaveAssignment}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => (window.location = "/student/fluency")}
          >
            Quit
          </Button>
        </Container>
        <Container style={{ marginTop: "10%" }}>
          {readDone ? (
            answerred ? (
              index < questions.length - 1 ? (
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
                <P1>{questions[index]}</P1>
                <FormControlLabel
                  value={choices[index][0]}
                  label={choices[index][0]}
                  control={<Radio />}
                  onChange={this.checkAnswer}
                />
                <br />
                <FormControlLabel
                  value={choices[index][1]}
                  label={choices[index][1]}
                  control={<Radio />}
                  onChange={this.checkAnswer}
                />
                <br />
                <FormControlLabel
                  value={choices[index][2]}
                  label={choices[index][2]}
                  control={<Radio />}
                  onChange={this.checkAnswer}
                />
                <br />
                <FormControlLabel
                  value={choices[index][3]}
                  label={choices[index][3]}
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
          <br />
          <LinearProgress variant="determinate" value={progress} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FluencyAssignPart);
