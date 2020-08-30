import React from "react";
import WordCard from "../assets/phonemecard";
import Process from "../../../../assets/process";
import { LinearProgress, Button } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";

class PhonemeTrainPart extends React.Component {
  constructor() {
    super();
    this.state = {
      ids: [],
      wrongIds: [],
      words: [],
      levels: [],
      phonemes: [],
      answers: [],
      index: 0,
      correct: false,
      answer: false,
      input: "",
      phonemeAssign: [],
    };
  }

  componentDidMount = async () => {
    const doc = await axios("/api/phoneme/phonemes");
    const { words, phonemes, levels, ids } = this.generateAssign(doc.data);
    const number = 30;
    await this.setState({
      words: words.slice(0, number),
      phonemes: phonemes.slice(0, number),
      levels: levels.slice(0, number),
      ids: ids.slice(0, number),
    });
  };

  generateAssign = (data) => {
    let { words, phonemes, levels, ids } = data;
    while (words.length < 50) {
      words = words.concat(words);
      phonemes = phonemes.concat(phonemes);
      levels = levels.concat(levels);
      ids = ids.concat(ids);
    }
    return { words, phonemes, levels, ids };
  };

  handleFlip = async () => {
    const {
      phonemes,
      words,
      levels,
      index,
      input,
      answers,
      ids,
      wrongIds,
    } = this.state;
    let newAnswers = answers;
    newAnswers.push(input);
    if (phonemes[index] === input) {
      this.setState({
        correct: true,
        answer: true,
        answers: newAnswers,
      });
    } else {
      wrongIds.push(ids[index]);
      phonemes.push(phonemes[index]);
      words.push(words[index]);
      levels.push(levels[index]);
      this.setState({
        correct: false,
        answer: true,
        answers: newAnswers,
        wrongIds,
        phonemes,
        words,
        levels,
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
    const { words, phonemes, answers, levels } = this.state;
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
      index,
      words,
      correct,
      answer,
      input,
      phonemes,
      phonemeAssign,
    } = this.state;
    const progress = Math.floor(((index + 1) / words.length) * 100);
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
                  next={this.changeQuestion}
                  last={index + 1 === words.length}
                  update={this.update}
                />
                <LinearProgress variant="determinate" value={progress} />
              </div>
            ) : (
              <div>
                <P1>Congratulations, you have finished the first part</P1>
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
