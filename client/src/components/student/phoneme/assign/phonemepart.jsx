import React from "react";
import WordCard from "../assets/phonemecard";
import Process from "../../../../assets/process";
import { LinearProgress, Button } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";

class PhonemeTrainPart extends React.Component {
  constructor() {
    super();
    this.state = {
      id: [],
      word: [],
      level: [],
      phoneme: [],
      answers: [],
      index: 0,
      correct: false,
      answer: false,
      input: "",
      rightWord: [],
      rightPhoneme: [],
      wrongWord: [],
      wrongPhoneme: [],
      phonemeAssign: [],
    };
  }

  componentDidMount = async () => {
    const doc = await axios("/api/phoneme/student/evalassign");
    const data = doc.data.phonemeAssign;
    let word = [];
    let phoneme = [];
    let level = [];
    let id = [];
    for (let i = 0; i < data.length; i++) {
      word.push(data[i].word);
      phoneme.push(data[i].phoneme);
      level.push(data[i].level);
      id.push(data[i]._id);
    }
    await this.setState({ word, phoneme, level, id });
  };

  handleFlip = async () => {
    const {
      phoneme,
      index,
      input,
      rightPhoneme,
      rightWord,
      word,
      answers,
    } = this.state;
    let newAnswers = answers;
    newAnswers.push(input);
    if (phoneme[index] === input) {
      let newRightPhoneme = rightPhoneme;
      let newRightWord = rightWord;

      await newRightPhoneme.push(phoneme[index]);
      await newRightWord.push(word[index]);
      this.setState({
        correct: true,
        answer: true,
        rightPhoneme: newRightPhoneme,
        rightWord: newRightWord,
        answers: newAnswers,
      });
    } else {
      let newWrongPhoneme = this.state.wrongPhoneme;
      let newWrongWord = this.state.wrongWord;
      await newWrongPhoneme.push(this.state.phoneme[this.state.index]);
      await newWrongWord.push(this.state.word[this.state.index]);
      this.setState({
        correct: false,
        answer: true,
        wrongPhoneme: newWrongPhoneme,
        wrongWord: newWrongWord,
        answers: newAnswers,
      });
    }
  };

  changeQuestion = async () => {
    await this.setState({
      index: this.state.index + 1,
      answer: false,
      input: "",
    });
  };

  update = async () => {
    const { word, phoneme, id, answers, level, rightWord } = this.state;
    let rightId = [];
    let wrongId = [];
    await word.forEach((word, index) => {
      if (rightWord.indexOf(word) !== -1) {
        rightId.push(id[index]);
      } else {
        wrongId.push(id[index]);
      }
    });
    await axios.post("/api/phoneme/rightwrong/update", { rightId, wrongId });
    // const newScore = 20 * (rightId.length / this.state.word.length);
    // axios.post("/api/phoneme/score/update", { newScore });
    let phonemeAssign = [];
    for (let i = 0; i < word.length; i++) {
      phonemeAssign.push({
        word: word[i],
        phoneme: phoneme[i],
        level: level[i],
        answer: answers[i],
      });
    }
    this.setState({ phonemeAssign });
  };

  render() {
    const {
      rightWord,
      index,
      word,
      correct,
      answer,
      input,
      phoneme,
      phonemeAssign,
    } = this.state;
    const progress = ((index + 1) / word.length) * 100;
    const accuracy = (rightWord.length / word.length) * 100;
    return (
      <div>
        {word.length !== 0 ? (
          <div style={{ margin: "30px 25%" }}>
            {index !== word.length ? (
              <div>
                <WordCard
                  word={word[index]}
                  phoneme={phoneme[index]}
                  input={input}
                  answered={answer}
                  correct={correct}
                  handleClick={() => this.handleFlip(index)}
                  handleInput={(input) => this.setState({ input: input })}
                  next={() => this.changeQuestion()}
                  last={index + 1 === word.length}
                  update={() => this.update()}
                />
                <LinearProgress variant="determinate" value={progress} />
              </div>
            ) : (
              <div>
                <h3>Congratulations, you have finished the first part</h3>
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  onClick={() => this.props.handlePhonemeAssign(phonemeAssign)}
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Process />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PhonemeTrainPart);
