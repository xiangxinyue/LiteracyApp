import AudioCard from "../assets/audiotable";
import React from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { Button, Container, Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PhonemeAudioAssign extends React.Component {
  constructor() {
    super();
    this.state = {
      assignment: [],
      id: null,
      audios: [],
      wrongAlert: false,
      rightAlert: false,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/phoneme/audioassign/one");
    const assignment = doc.data[0].assignment;
    const id = doc.data[0]._id;
    this.setState({ assignment, id }, () => console.log(assignment));
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ wrongAlert: false, rightAlert: false });
  };

  handleUpload = async (file) => {
    const uploadConfig = await axios.get("/api/phoneme/audio/");
    await axios
      .put(uploadConfig.data.url, file, {
        headers: {
          "Content-type": file.type,
        },
      })
      .catch((err) => console.log(err));
    const audios = this.state.audios;
    let newAudios = audios;
    newAudios.push(uploadConfig.data.key);
    this.setState({ audios: newAudios, rightAlert: true });
  };

  handleChangeQuestion = () => {
    const { index } = this.state;
    this.setState({ index: index + 1 });
  };

  handleSubmit = async () => {
    const { assignment, id, audios } = this.state;
    let newAssignment = [];
    for (let i = 0; i < assignment.length; i++) {
      const dataset = {
        question: assignment[i].question,
        audio: assignment[i].audio,
        answer: audios[i],
      };
      newAssignment.push(dataset);
    }
    const doc = await axios.post("/api/phoneme/audioassign/create", {
      newAssignment,
      id,
    });
    if (doc.data) this.setState({ rightAlert: true });
    else this.setState({ wrongAlert: true });
  };

  render() {
    const { assignment, rightAlert, wrongAlert } = this.state;
    return (
      <div>
        <Container>
          <AudioCard
            rows={assignment}
            handleUpload={(file) => this.handleUpload(file)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            // onClick={this.handleSubmit}
            style={{ width: "90%", margin: 20 }}
          >
            Submit
          </Button>
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

export default PhonemeAudioAssign;
