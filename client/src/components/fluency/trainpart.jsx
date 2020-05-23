import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";
import Process from "../../assets/process";
import $ from "jquery";
let time;

class FluencyTrainingPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 0,
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
    const doc = await axios("/api/fluency/train/get");
    const data = doc.data;
    await this.setState({
      paragraphs: data.paragraphs,
      questions: data.questions,
      choices: data.choices,
      answers: data.answers,
      maxNumOfQues: data.paragraphs.length - 1,
      speed: this.props.currentUser.fluency_curr_score,
    });
    console.log(this.state);
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
    const readSpeed = (1 / this.state.speed) * 1000;
    console.log(`Real speed is ${readSpeed}`);
    await setTimeout(() => {
      time = setInterval(async () => {
        if (index < this.state.length) {
          await $(`.${index}`).css("color", "white"); // "#e9ecef"
          index += 1;
        } else {
          await this.setState({ readDone: true });
          clearInterval(time);
        }
      }, readSpeed);
    }, 1000);
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
      readDone: false,
      answerred: false,
    });
    const sentenceArray = await this.state.currPara.split("");
    await this.setState({ currParaArray: sentenceArray });
    await this.setState({ length: this.state.currParaArray.length });

    this.startReading();
  };

  finishTrain = async () => {
    const levelUp = this.state.score / (this.state.maxNumOfQues + 1) >= 0.8;
    if (levelUp) {
      const newSpeed = Math.floor(this.state.speed * 1.2);
      await axios.post("/api/fluency/score/update", { newSpeed });
    } else {
      const newSpeed = Math.floor(this.state.speed * 0.8);
      await axios.post("/api/fluency/score/update", { newSpeed });
    }
    window.location = "/student/fluency";
  };

  render() {
    return (
      <div>
        {this.state.readDone ? (
          this.state.answerred ? (
            this.state.currentParaNum < this.state.maxNumOfQues ? (
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
              <h3>{this.state.questions[this.state.currentParaNum]}</h3>
              {this.state.choices[this.state.currentParaNum].map(
                (choice, index) => (
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
                )
              )}
            </div>
          )
        ) : (
          <div>
            {this.state.currParaArray.length !== 0 ? (
              <div className="row" style={{ paddingLeft: 30, fontSize: 20 }}>
                {this.state.currParaArray.map((letter, index) => {
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

export default connect(mapStateToProps)(FluencyTrainingPart);
