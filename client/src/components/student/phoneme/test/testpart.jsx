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
      ids: [],
      levels: [],
      words: [],
      phonemes: [],
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
    const doc = await axios.get("/api/phoneme/phonemes");
    const data = doc.data;
    await this.setState({
      words: data.words,
      phonemes: data.phonemes,
      levels: data.levels,
      ids: data.ids,
    });
  };

  handleFlip = async () => {
    if (this.state.phonemes[this.state.index] === this.state.input) {
      let newRightPhoneme = this.state.rightPhoneme;
      let newRightWord = this.state.rightWord;
      await newRightPhoneme.push(this.state.phonemes[this.state.index]);
      await newRightWord.push(this.state.words[this.state.index]);
      this.setState({
        correct: true,
        answer: true,
        rightPhoneme: newRightPhoneme,
        rightWord: newRightWord,
      });
    } else {
      let newWrongPhoneme = this.state.wrongPhoneme;
      let newWrongWord = this.state.wrongWord;
      await newWrongPhoneme.push(this.state.phonemes[this.state.index]);
      await newWrongWord.push(this.state.words[this.state.index]);
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
    const { rightWord, words, phonemes, answers, levels, ids } = this.state;
    let rightId = [];
    let wrongId = [];
    await words.forEach((word, index) => {
      if (this.state.rightWord.indexOf(word) !== -1) {
        rightId.push(ids[index]);
      } else {
        wrongId.push(ids[index]);
      }
    });

    const newScore = 20 * (rightWord.length / words.length);
    let phonemeAssign = [];
    for (let i = 0; i < words.length; i++) {
      phonemeAssign.push({
        word: words[i],
        phoneme: phonemes[i],
        level: levels[i],
        answer: answers[i],
      });
    }
    // create practice student-side assignment
    await axios.post("/api/phoneme/test", { newScore, phonemeAssign });
    // update the first score
    await axios.put("/api/phoneme/currscore", { newScore });
    window.location = "/student/phoneme";
  };

  render() {
    const progress = ((this.state.index + 1) / this.state.words.length) * 100;
    const accuracy =
      (this.state.rightWord.length / this.state.words.length) * 100;
    return (
      <div>
        {this.state.words.length !== 0 ? (
          <div style={{ margin: "30px 25%" }}>
            <WordCard
              word={this.state.words[this.state.index]}
              phoneme={this.state.phonemes[this.state.index]}
              input={this.state.input}
              answered={this.state.answer}
              correct={this.state.correct}
              handleClick={() => this.handleFlip(this.state.index)}
              handleInput={(input) => this.setState({ input: input })}
              next={() => this.changeQuestion()}
              last={this.state.index + 1 === this.state.words.length}
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
