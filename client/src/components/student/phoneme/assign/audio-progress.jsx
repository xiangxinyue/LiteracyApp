import React from "react";
import axios from "axios";
import {
  Button,
  Container,
  Paper,
  LinearProgress,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import AudioRecord from "./audiorecord";
import keys from "../../../../assets/keys";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class PhonemeAudioAssign extends React.Component {
  constructor() {
    super();
    this.state = {
      levels: [],
      originalAudios: [],
      questions: [],
      answerAudios: [],
      index: 0,
      audioDone: false,
      alert: false,
    };
  }

  componentDidMount = () => {
    const {
      audioLevels,
      audioIndex,
      originalAudios,
      questions,
      answerAudios,
    } = this.props.progress;
    this.setState({
      originalAudios,
      questions,
      answerAudios,
      levels: audioLevels,
      index: audioIndex,
    });
  };

  generateAssign = (data) => {
    let { questions, audios } = data;
    while (questions.length < 50) {
      questions = questions.concat(questions);
      audios = audios.concat(audios);
    }
    return { questions, audios };
  };

  handleUpload = async (file) => {
    const { index, answerAudios } = this.state;
    const uploadConfig = await axios.get("/api/phoneme/audio");
    await axios
      .put(uploadConfig.data.url, file, {
        headers: {
          "Content-type": file.type,
        },
      })
      .catch((err) => console.log(err));
    let newAudios = answerAudios;
    newAudios.push(uploadConfig.data.key);
    this.setState(
      {
        answerAudios: newAudios,
        audioDone: true,
        index: index + 1,
      },
      () => console.log(this.state)
    );
  };

  handleChangeQuestion = () => {
    const { index, originalAudios, answerAudios, questions } = this.state;
    if (originalAudios.length === index) {
      let audioAssign = [];
      for (let i = 0; i < originalAudios.length; i++) {
        audioAssign.push({
          question: questions[i],
          audios: originalAudios[i],
          answer: answerAudios[i],
        });
      }
      this.props.handleAudioAssign(audioAssign);
    }
    this.setState({ audioDone: false }, () => console.log(this.state));
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
      phonemeAssign: this.props.phonemeAssign,
      audioIndex: this.state.index,
      audioLevels: this.state.levels,
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
    const { audioDone, originalAudios, index, questions } = this.state;
    const progress = Math.floor(((index + 1) / questions.length) * 100);
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
          <Paper>
            {originalAudios.length === 0 ? null : originalAudios.length !==
              index ? (
              audioDone ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={this.handleChangeQuestion}
                >
                  Next Question
                </Button>
              ) : (
                <Container>
                  <P2>{questions[index]}</P2>
                  <br />
                  {originalAudios[index].map((audio) => {
                    return <audio src={keys.AWS + audio} controls="controls" />;
                  })}

                  <hr />
                  <AudioRecord
                    handleUpload={(file) => this.handleUpload(file)}
                  />
                  <br />
                  <LinearProgress variant="determinate" value={progress} />
                </Container>
              )
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={this.handleChangeQuestion}
                style={{ width: "90%", margin: 20 }}
              >
                Submit
              </Button>
            )}
          </Paper>
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

export default PhonemeAudioAssign;
