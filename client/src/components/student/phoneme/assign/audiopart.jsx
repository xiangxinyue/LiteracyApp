import React from "react";
import axios from "axios";
import { Button, Container, Paper, LinearProgress } from "@material-ui/core";
import AudioRecord from "./audiorecord";
import keys from "../../../../assets/keys";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";

class PhonemeAudioAssign extends React.Component {
  constructor() {
    super();
    this.state = {
      originalAudios: [],
      questions: [],
      answerAudios: [],
      audioDone: false,
      index: 0,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/phoneme/audios");
    const { questions, audios } = this.generateAssign(doc.data);
    const number = 20;
    this.setState({
      originalAudios: audios.slice(0, number),
      questions: questions.slice(0, number),
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

  // handleAudioAssign
  render() {
    const { audioDone, originalAudios, index, questions } = this.state;
    const progress = Math.floor(((index + 1) / questions.length) * 100);
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
                  <P2>{questions[index]}</P2>
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
      </div>
    );
  }
}

export default PhonemeAudioAssign;
