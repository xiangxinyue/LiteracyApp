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
      rightId: [],
      levels: [],
      words: [],
      phonemes: [],
      answers: [],
      index: 0,
      correct: false,
      answer: false,
      input: "",
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/phoneme/phonemes");
    let data = doc.data;
    await this.setState({
      words: data.words.slice(0, 10),
      phonemes: data.phonemes.slice(0, 10),
      levels: data.levels.slice(0, 10),
      ids: data.ids.slice(0, 10),
    });
  };

  handleFlip = async () => {
    if (this.state.phonemes[this.state.index] === this.state.input) {
      const newRightIds = this.state.rightId;
      newRightIds.push(this.state.ids[this.state.index]);
      this.setState({
        correct: true,
        answer: true,
        rightId: newRightIds,
      });
    } else {
      this.setState({
        correct: false,
        answer: true,
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
    const { rightId, words, phonemes, answers, levels } = this.state;
    const newScore = 20 * (rightId.length / words.length);
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
    await axios.post("/api/phoneme/score", { newScore });
    window.location = "/student/phoneme";
  };

  render() {
    const progress = ((this.state.index + 1) / this.state.words.length) * 100;
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
