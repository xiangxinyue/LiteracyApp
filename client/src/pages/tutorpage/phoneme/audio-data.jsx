import React from "react";
import axios from "axios";
import { Button, Container, TextField } from "@material-ui/core";
import AudioTable from "../../../components/tutor/phoneme/audiotable";

class PhonemeTutorAudioData extends React.Component {
  constructor() {
    super();
    this.state = {
      audioData: [],
      question: "",
      audios: [],
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/phoneme/audio/table");
    console.log(doc.data);
    this.setState({ audioData: doc.data });
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ wrongAlert: false, rightAlert: false });
  };

  handleAddEntry = async () => {
    const { audios } = this.state;
    // upload audio
    if (audios.length !== 0) {
      // apply urls
      const promises1 = await audios.map(async () => {
        const doc = await axios.get("/api/phoneme/audio");
        return doc.data;
      });
      const uploadConfigs = await Promise.all(promises1);
      // upload audios
      const promises2 = await audios.map(async (file, index) => {
        await axios
          .put(uploadConfigs[index].url, file, {
            headers: {
              "Content-type": file.type,
            },
          })
          .catch((err) => console.log(err));
      });
      await Promise.all(promises2);
      // add entry
      const audioKeys = [];
      uploadConfigs.forEach((audio) => {
        audioKeys.push(audio.key);
      });
      await axios.post("/api/phoneme/audio", {
        audios: audioKeys,
        question: this.state.question,
      });
      await this.setState({ question: "", audios: [] });
      this.componentDidMount();
    }
  };

  handleDeleteEntry = async (id) => {
    await axios.delete("/api/phoneme/audio/" + id);
    this.componentDidMount();
  };

  render() {
    const { audioData, question } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Modify Audio data</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/phoneme">
            Go back
          </Button>
        </div>
        <Container>
          <div>
            <TextField
              label="Question Content"
              value={question}
              style={{ width: 400 }}
              autoComplete="off"
              multiline
              onChange={(e) => this.setState({ question: e.target.value })}
            />
            <input
              type="file"
              accept="audio/*"
              multiple={true}
              onChange={(e) => {
                this.setState({ audios: Array.from(e.target.files) });
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleAddEntry}
            >
              Add
            </Button>
          </div>
          <br />
          <AudioTable rows={audioData} handleDelete={this.handleDeleteEntry} />
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorAudioData;
