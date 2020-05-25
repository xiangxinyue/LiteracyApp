import React from "react";
import PhonemeHeader from "../../components/phoneme/header";
import { Container, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import MicRecorder from "mic-recorder-to-mp3";
import keys from "../../assets/keys";
import axios from "axios";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class FluencyAudioRecord extends React.Component {
  state = {
    isRecording: false,
    blobURL: "",
    file: null,
    isBlocked: false,
    alert: false,
    oldAudios: [],
  };

  componentDidMount = async () => {
    const { oldAudios } = this.state;
    const doc = await axios.get("/api/phoneme/audio/get");
    this.setState({ oldAudios: doc.data });
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  };

  handleStart = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  handleStop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        const date = new Date();
        const file = new File([blob], date.valueOf(), { type: "audio/wav" });
        this.setState({ blobURL, file, isRecording: false }, () =>
          console.log(this.state.blobURL)
        );
      })
      .catch((e) => console.log(e));
  };

  handleUpload = async () => {
    const { file, alert } = this.state;
    const uploadConfig = await axios.get("/api/phoneme/audio/");
    await axios
      .put(uploadConfig.data.url, file, {
        headers: {
          "Content-type": file.type,
        },
      })
      .catch((err) => console.log(err));
    await axios.post("/api/user/phoneme_audio/update", {
      audioUrl: uploadConfig.data.key,
    });
    await this.setState({ blobURL: "", file: null, alert: true });
    window.location = "/student/phoneme/audiorecord";
  };

  render() {
    const { oldAudios, alert } = this.state;
    return (
      <div>
        <PhonemeHeader />
        <Container>
          <audio src={this.state.blobURL} controls="controls" />
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleStart}
            disabled={this.state.isRecording}
          >
            Record
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.handleStop}
            disabled={!this.state.isRecording}
          >
            Stop
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleUpload}
            disabled={this.state.isRecording}
          >
            Upload
          </Button>
          <hr />
          <h3>My old record audios:</h3>
          {oldAudios.map((mp3) => (
            <audio src={keys.AWS + mp3} controls="controls" />
          ))}
        </Container>
        <Snackbar open={alert} autoHideDuration={2000}>
          <Alert severity="success">Upload Audio Successfully</Alert>
        </Snackbar>
      </div>
    );
  }
}
export default FluencyAudioRecord;
