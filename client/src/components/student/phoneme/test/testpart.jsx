import React from "react";
import WordCard from "../assets/wordcard";
import Process from "../../../../assets/process";
import LinearProgress from "@material-ui/core/LinearProgress";
import { connect } from "react-redux";
import axios from "axios";

class PhonemeTestPart extends React.Component {
  constructor() {
    super();
    this.state = {
      id: [],
      level: [],
      word: [],
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
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/phoneme/test/get");
    const data = doc.data;
    await this.setState({
      word: data.words,
      phoneme: data.phonemes,
      level: data.levels,
      id: data.id,
    });
  };

  handleFlip = async () => {
    if (this.state.phoneme[this.state.index] === this.state.input) {
      let newRightPhoneme = this.state.rightPhoneme;
      let newRightWord = this.state.rightWord;
      await newRightPhoneme.push(this.state.phoneme[this.state.index]);
      await newRightWord.push(this.state.word[this.state.index]);
      this.setState({
        correct: true,
        answer: true,
        rightPhoneme: newRightPhoneme,
        rightWord: newRightWord,
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
      });
    }
    const newAnswers = this.state.answers;
    newAnswers.push(this.state.input);
    this.setState({ answers: newAnswers });
  };

  changeQuestion = async () => {
    await this.setState({
      index: this.state.index + 1,
      answer: false,
      input: "",
    });
  };

  update = async () => {
    const { rightWord, word, phoneme, answers, level } = this.state;
    let rightId = [];
    let wrongId = [];
    await this.state.word.forEach((word, index) => {
      if (this.state.rightWord.indexOf(word) !== -1) {
        rightId.push(this.state.id[index]);
      } else {
        wrongId.push(this.state.id[index]);
      }
    });
    // save wrong and right questions
    await axios.post("/api/phoneme/rightwrong/update", { rightId, wrongId });
    const newScore = 20 * (rightWord.length / word.length);
    let phonemeAssign = [];
    for (let i = 0; i < word.length; i++) {
      phonemeAssign.push({
        word: word[i],
        phoneme: phoneme[i],
        level: level[i],
        answer: answers[i],
      });
    }
    // create practice student-side assignment
    await axios.post("/api/phoneme/testassign", { newScore, phonemeAssign });
    // update the first score
    await axios.post("/api/phoneme/currscore/update", { newScore });
    window.location = "/student/phoneme";
  };

  render() {
    const progress = ((this.state.index + 1) / this.state.word.length) * 100;
    const accuracy =
      (this.state.rightWord.length / this.state.word.length) * 100;
    return (
      <div>
        {this.state.word.length !== 0 ? (
          <div style={{ margin: "30px 25%" }}>
            <WordCard
              word={this.state.word[this.state.index]}
              phoneme={this.state.phoneme[this.state.index]}
              input={this.state.input}
              answered={this.state.answer}
              correct={this.state.correct}
              handleClick={() => this.handleFlip(this.state.index)}
              handleInput={(input) => this.setState({ input: input })}
              next={() => this.changeQuestion()}
              last={this.state.index + 1 === this.state.word.length}
              update={() => this.update()}
            />
            <LinearProgress variant="determinate" value={progress} />
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

export default connect(mapStateToProps)(PhonemeTestPart);
