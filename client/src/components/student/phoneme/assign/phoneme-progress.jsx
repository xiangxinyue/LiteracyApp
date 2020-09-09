import React from "react";
import WordCard from "../assets/phonemecard";
import Process from "../../../../assets/process";
import { LinearProgress, Button, Container } from "@material-ui/core";
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

  componentDidMount = () => {
    const {
      ids,
      wrongIds,
      words,
      phonemeLevels,
      phonemes,
      answers,
      phonemeIndex,
    } = this.props.progress;
    this.setState({
      ids,
      wrongIds,
      words,
      levels: phonemeLevels,
      phonemes,
      answers,
      index: phonemeIndex,
    });
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

  handleSaveAssignment = async () => {
    // 1. Clean the student last progress and delete the old progress
    const doc1 = await axios.put("/api/phoneme/student/progress", {
      newProgress: "",
    });
    if (doc1.data !== "") {
      await axios.delete("/api/phoneme/student/progress/" + doc1.data);
    }

    // 2. save progress into database and save progress_id into student database
    const doc2 = await axios.post("/api/phoneme/student/progress", {
      ...this.state,
      phonemeIndex: this.state.index,
      phonemeLevels: this.state.levels,
    });
    await axios.put("/api/phoneme/student/progress", {
      newProgress: doc2.data._id,
    });
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
            onClick={() => (window.location = "/student/phoneme")}
          >
            Quit
          </Button>
        </Container>
        <Container style={{ marginTop: "10%" }}>
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
                    onClick={() =>
                      this.props.handlePhonemeAssign(phonemeAssign)
                    }
                  >
                    Continue
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Process />
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PhonemeTrainPart);
