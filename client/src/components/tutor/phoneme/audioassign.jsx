import React from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { Button, Container, TextField, Snackbar } from "@material-ui/core";
import AudioTable from "../../../assets/table/audiotable";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PhonemeTutorAudioAssign extends React.Component {
  constructor() {
    super();
    this.state = {
      assigndata: [],
      number: 10,
      currQuestion: "",
      currAudio: "",
      audios: [],
      rightAlert: false,
      wrongAlert: false,
    };
  }

  componentDidMount = async () => {};

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ wrongAlert: false, rightAlert: false });
  };

  handleAddEntry = async () => {
    const { currAudio, currQuestion, assigndata } = this.state;
    // upload audio
    const file = currAudio;
    if (file) {
      const uploadConfig = await axios.get("/api/phoneme/audio/");
      await axios
        .put(uploadConfig.data.url, file, {
          headers: {
            "Content-type": file.type,
          },
        })
        .catch((err) => console.log(err));
      // update state assignment data
      const newAssignData = {
        audio: uploadConfig.data.key,
        question: currQuestion,
      };
      let newAssignDataArray = assigndata;
      newAssignDataArray.push(newAssignData);
      this.setState({
        rightAlert: true,
        assigndata: newAssignDataArray,
        currAudio: null,
        currQuestion: "",
      });
      console.log(this.state);
    } else {
      this.setState({ wrongAlert: true });
    }
  };

  handleDeleteEntry = (audiokey) => {
    const assigndata = this.state.assigndata;
    const newAssignData = assigndata.filter((file) => {
      return file.audio !== audiokey;
    });
    this.setState({ assigndata: newAssignData });
  };

  handleSubmit = async () => {
    const { assigndata } = this.state;
    const doc = await axios.post("/api/phoneme/audioassign/create", {
      assigndata,
    });
    if (doc.data) this.setState({ rightAlert: true });
    else this.setState({ wrongAlert: true });
  };

  render() {
    const {
      assigndata,
      number,
      currQuestion,
      rightAlert,
      wrongAlert,
    } = this.state;
    return (
      <div>
        <Container>
          <TextField
            label="Num of Questions"
            value={number}
            onChange={(e) => this.setState({ number: e.target.value })}
          />
          <br />
          {assigndata.length != number ? (
            <div>
              <TextField
                label="Question Content"
                value={currQuestion}
                style={{ width: 400 }}
                onChange={(e) =>
                  this.setState({ currQuestion: e.target.value })
                }
              />
              <input
                type="file"
                accept="audio/*"
                onChange={(e) =>
                  this.setState({ currAudio: e.target.files[0] })
                }
              />
              <Button
                variant="contained"
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
              onClick={this.handleSubmit}
            >
              Submit New Assignment
            </Button>
          )}
          <AudioTable
            rows={assigndata}
            handleDelete={(audiokey) => this.handleDeleteEntry(audiokey)}
          />
        </Container>
        <Snackbar
          open={rightAlert}
          autoHideDuration={2000}
          onClose={this.handleCloseAlert}
        >
          <Alert onClose={this.handleClose} severity="success">
            Operation Successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={wrongAlert}
          autoHideDuration={2000}
          onClose={this.handleCloseAlert}
        >
          <Alert severity="warning">
            you did not choose the right audio file
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default PhonemeTutorAudioAssign;
