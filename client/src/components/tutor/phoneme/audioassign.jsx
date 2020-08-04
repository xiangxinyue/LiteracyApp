import React from "react";
import axios from "axios";
import { Button, Container, TextField } from "@material-ui/core";
import AudioTable from "./audiotable";

class PhonemeTutorAudioAssign extends React.Component {
  constructor() {
    super();
    this.state = {
      assigndata: [],
      number: 10,
      currQuestion: "",
      currAudios: [],
    };
  }

  componentDidMount = async () => {};

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ wrongAlert: false, rightAlert: false });
  };

  handleAddEntry = async () => {
    const { currAudios, currQuestion, assigndata } = this.state;
    // upload audio
    const length = currAudios.length;
    if (length !== 0) {
      console.log(currAudios);
      // apply urls
      const promises1 = await currAudios.map(async () => {
        const doc = await axios.get("/api/phoneme/audio/");
        return doc.data;
      });
      const uploadConfigs = await Promise.all(promises1);
      console.log(uploadConfigs);
      // upload audios
      const promises2 = await currAudios.map(async (file, index) => {
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
      const audios = [];
      uploadConfigs.forEach((audio) => {
        audios.push(audio.key);
      });
      const newAssignData = {
        audios,
        question: currQuestion,
      };
      let newAssignDataArray = assigndata;
      newAssignDataArray.push(newAssignData);
      this.setState({
        assigndata: newAssignDataArray,
        currAudio: null,
        currQuestion: "",
      });
    }
  };

  handleDeleteEntry = (audiokey) => {
    const assigndata = this.state.assigndata;
    const newAssignData = assigndata.filter((file) => {
      return file.audio !== audiokey;
    });
    this.setState({ assigndata: newAssignData });
  };

  render() {
    const { assigndata, number, currQuestion } = this.state;
    return (
      <div>
        <Container>
          <TextField
            label="Num of Questions"
            value={number}
            autoComplete="off"
            onChange={(e) => this.setState({ number: e.target.value })}
          />
          <br />
          {assigndata.length != number ? (
            <div>
              <TextField
                label="Question Content"
                value={currQuestion}
                style={{ width: 400 }}
                autoComplete="off"
                multiline
                onChange={(e) =>
                  this.setState({ currQuestion: e.target.value })
                }
              />
              <input
                type="file"
                accept="audio/*"
                multiple={true}
                onChange={(e) => {
                  this.setState({ currAudios: Array.from(e.target.files) });
                }}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleAddEntry}
              >
                Add Question
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.handleAudioAssign(assigndata)}
            >
              Submit This Part
            </Button>
          )}
          <AudioTable
            rows={assigndata}
            handleDelete={(audiokey) => this.handleDeleteEntry(audiokey)}
          />
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorAudioAssign;
