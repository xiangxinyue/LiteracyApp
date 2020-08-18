import React from "react";
import { Container, Button } from "@material-ui/core";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class FluencyAudioRecord extends React.Component {
  state = {
    isRecording: false,
    blobURL: "",
    file: null,
    isBlocked: false,
    alert: false,
  };

  componentDidMount = async () => {
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
    const { file, isRecording, blobURL } = this.state;
    return (
      <div>
        <audio src={blobURL} controls="controls" />
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleStart}
          disabled={isRecording}
        >
          Record
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={this.handleStop}
          disabled={!isRecording}
        >
          Stop
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.props.handleUpload(file)}
          disabled={isRecording}
        >
          Upload
        </Button>
      </div>
    );
  }
}
export default FluencyAudioRecord;
