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
      ids: [],
      words: [],
      levels: [],
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
      phonemeAssign: [],
    };
  }

  componentDidMount = async () => {
    const doc = await axios("/api/phoneme/phonemes");
    const { words, phonemes, levels, ids } = doc.data;
    await this.setState({ words, phonemes, levels, ids });
  };

  handleFlip = async () => {
    const {
      phonemes,
      index,
      input,
      rightPhoneme,
      rightWord,
      words,
      answers,
    } = this.state;
    let newAnswers = answers;
    newAnswers.push(input);
    if (phonemes[index] === input) {
      let newRightPhoneme = rightPhoneme;
      let newRightWord = rightWord;

      await newRightPhoneme.push(phonemes[index]);
      await newRightWord.push(words[index]);
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
      await newWrongPhoneme.push(this.state.phonemes[this.state.index]);
      await newWrongWord.push(this.state.words[this.state.index]);
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
    const { words, phonemes, ids, answers, levels, rightWord } = this.state;
    let rightId = [];
    let wrongId = [];
    await words.forEach((word, index) => {
      if (rightWord.indexOf(word) !== -1) {
        rightId.push(ids[index]);
      } else {
        wrongId.push(ids[index]);
      }
    });

    let phonemeAssign = [];
    for (let i = 0; i < words.length; i++) {
      phonemeAssign.push({
        word: words[i],
        phoneme: phonemes[i],
        level: levels[i],
        answer: answers[i],
      });
    }
    this.setState({ phonemeAssign });
  };

  render() {
    const {
      rightWord,
      index,
      words,
      correct,
      answer,
      input,
      phonemes,
      phonemeAssign,
    } = this.state;
    const progress = ((index + 1) / words.length) * 100;
    const accuracy = (rightWord.length / words.length) * 100;
    return (
      <div>
        {words.length !== 0 ? (
          <div style={{ margin: "30px 25%" }}>
            {index !== words.length ? (
              <div>
                <WordCard
                  word={words[index]}
                  phoneme={phonemes[index]}
                  input={input}
                  answered={answer}
                  correct={correct}
                  handleClick={() => this.handleFlip(index)}
                  handleInput={(input) => this.setState({ input })}
                  next={() => this.changeQuestion()}
                  last={index + 1 === words.length}
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
