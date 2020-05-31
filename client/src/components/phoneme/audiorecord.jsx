import React from "react";
import PhonemeHeader from "./header";
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
        const file = new File([blob], date.valueOf(), { type: "audio/*" });
        this.setState({ blobURL, file, isRecording: false }, () =>
          console.log(this.state.blobURL)
        );
      })
      .catch((e) => console.log(e));
  };

  render() {
    const { file } = this.state;
    return (
      <div>
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
          onClick={() => this.props.handleUpload(file)}
          disabled={this.state.isRecording}
        >
          Upload
        </Button>
      </div>
    );
  }
}
export default FluencyAudioRecord;
