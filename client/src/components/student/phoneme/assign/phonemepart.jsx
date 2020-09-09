import React from "react";
import WordCard from "../assets/phonemecard";
import Process from "../../../../assets/process";
import { LinearProgress, Button, Container, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import axios from "axios";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
      alert: false,
      appearTimes: {},
    };
  }

  componentDidMount = async () => {
    const doc = await axios("/api/phoneme/phonemes");
    const { words, phonemes, levels, ids } = this.generateAssign(doc.data);
    const number = 2;
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
      appearTimes,
    } = this.state;
    if (!appearTimes[words[index]]) {
      appearTimes[words[index]] = 1;
    } else {
      appearTimes[words[index]] += 1;
    }
    this.setState({ appearTimes });
    let newAnswers = answers;
    newAnswers.push(input);
    if (phonemes[index] === input) {
      this.setState({
        correct: true,
      });
    } else if (appearTimes[words[index]] < 3) {
      wrongIds.push(ids[index]);
      phonemes.push(phonemes[index]);
      words.push(words[index]);
      levels.push(levels[index]);
      this.setState({
        correct: false,
        wrongIds,
        phonemes,
        words,
        levels,
      });
    }
    this.setState({ answer: true, answers: newAnswers });
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
    });
    await axios.put("/api/phoneme/student/progress", {
      newProgress: doc2.data._id,
    });
    // show alert bar
    this.setState({ alert: true });
  };
  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ alert: false });
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
      appearTimes,
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
                  <br />
                  {appearTimes[words[index]] === 2 ? (
                    <div>(Hint: {phonemes[index]})</div>
                  ) : null}
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
        <Snackbar
          open={this.state.alert}
          autoHideDuration={2000}
          onClose={this.handleCloseAlert}
        >
          <Alert onClose={this.handleClose} severity="success">
            Saved Successfully!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PhonemeTrainPart);
