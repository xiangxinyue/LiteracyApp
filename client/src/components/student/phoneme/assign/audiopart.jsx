import React from "react";
import axios from "axios";
import { Button, Container, Paper } from "@material-ui/core";
import AudioRecord from "./audiorecord";
import keys from "../../../../assets/keys";

class PhonemeAudioAssign extends React.Component {
  constructor() {
    super();
    this.state = {
      originalAudios: [],
      questions: [],
      assignId: null,
      answerAudios: [],
      audioDone: false,
      index: 0,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/phoneme/student/evalassign");
    const assignment = doc.data.audioAssign;
    let audios = [];
    let question = [];
    for (let i = 0; i < assignment.length; i++) {
      audios.push(assignment[i].audios);
      question.push(assignment[i].question);
    }
    this.setState({
      originalAudios: audios,
      questions: question,
      assignId: doc.data._id,
    });
  };

  handleUpload = async (file) => {
    const { index, answerAudios } = this.state;
    const uploadConfig = await axios.get("/api/phoneme/audio/");
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
      console.log("arrives here");
      let audioAssign = [];
      for (let i = 0; i < originalAudios.length; i++) {
        audioAssign.push({
          question: questions[i],
          audio: originalAudios[i],
          answer: answerAudios[i],
        });
      }
      this.props.handleAudioAssign(audioAssign);
    }
    this.setState({ audioDone: false }, () => console.log(this.state));
  };

  // handleAudioAssign
  render() {
    const { audioDone, originalAudios, index, questions } = this.state;
    return (
      <div>
        <Container>
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
                  <h3>{questions[index]}</h3>
                  <br />
                  {originalAudios[index].map((audio) => {
                    console.log(audio);
                    return <audio src={keys.AWS + audio} controls="controls" />;
                  })}

                  <hr />
                  <AudioRecord
                    handleUpload={(file) => this.handleUpload(file)}
                  />
                  <br />
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
      </div>
    );
  }
}

export default PhonemeAudioAssign;
