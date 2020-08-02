import React from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container, Snackbar } from "@material-ui/core";
import Table from "../../../components/tutor/phoneme/phonemetable";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PhonemeTutorTrain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      traindata: [],
      testshow: false,
      alert: false,
      trainAddWord: "",
      trainAddPhoneme: "",
      trainAddLevel: "",
    };
  }

  componentDidMount = async () => {
    const traindata = await axios.get("/api/phoneme/train/gettable");
    await this.setState({
      traindata: traindata.data,
    });
  };

  addNewTrain = async () => {
    const { trainAddWord, trainAddPhoneme, trainAddLevel } = this.state;
    const data = {
      word: trainAddWord,
      phoneme: trainAddPhoneme,
      level: trainAddLevel,
    };
    await axios.post("/api/phoneme/train/add", { data });
    await this.setState({
      alert: true,
      trainAddWord: "",
      trainAddPhoneme: "",
      trainAddLevel: "",
    });
    this.componentDidMount();
  };

  addNewTest = async () => {
    const { testAddWord, testAddPhoneme, testAddLevel } = this.state;
    const data = {
      word: testAddWord,
      phoneme: testAddPhoneme,
      level: testAddLevel,
    };
    await axios.post("/api/phoneme/test/add", { data });
    await this.setState({
      alert: true,
      testAddWord: "",
      testAddPhoneme: "",
      testAddLevel: "",
    });
    this.componentDidMount();
  };

  deleteTrainData = async (id) => {
    await axios.post("/api/phoneme/train/delete", { id });
    this.componentDidMount();
    this.setState({ alert: true });
  };

  deleteTestData = async (id) => {
    await axios.post("/api/phoneme/test/delete", { id });
    this.componentDidMount();
    this.setState({ alert: true });
  };

  addNewAssignEntry = () => {
    const {
      assignAddWord,
      assignAddPhoneme,
      assignAddLevel,
      assigndata,
    } = this.state;
    const newEntry = {
      word: assignAddWord,
      phoneme: assignAddPhoneme,
      level: assignAddLevel,
    };
    const newAssign = assigndata;
    newAssign.push(newEntry);
    this.setState({
      assigndata: newAssign,
      assignAddWord: "",
      assignAddPhoneme: "",
      assignAddLevel: "",
      alert: true,
    });
  };

  generateAssign = () => {
    const { traindata, assignNum } = this.state;
    const length = traindata.length;
    const assign = [];
    for (let i = 0; i < assignNum; i++) {
      const index = Math.floor(Math.random() * length);
      console.log("choose", index);
      assign.push(traindata[index]);
    }
    this.setState({ assigndata: assign, alert: true });
  };

  deleteAssignEntry = (id) => {
    const newAssign = this.state.assigndata.filter((ele) => {
      if (ele.id !== id) return ele;
    });
    this.setState({ assigndata: newAssign, alert: true });
  };

  addNewAssign = async () => {
    await axios.post("/api/phoneme/assign/add", {
      data: this.state.assigndata,
    });
    await this.setState({ alert: true });
    window.location = "/phonemeassign";
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ alert: false });
  };

  render() {
    const {
      traindata,
      alert,
      trainAddWord,
      trainAddPhoneme,
      trainAddLevel,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify the training data</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/phoneme">
            Go back
          </Button>
        </div>
        <Container>
          <TextField
            id="standard-basic"
            label="Word"
            value={trainAddWord}
            autoComplete="off"
            onChange={(e) => this.setState({ trainAddWord: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Phoneme"
            value={trainAddPhoneme}
            autoComplete="off"
            onChange={(e) => this.setState({ trainAddPhoneme: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Level"
            value={trainAddLevel}
            autoComplete="off"
            onChange={(e) => this.setState({ trainAddLevel: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.addNewTrain}
          >
            Add New Train
          </Button>
          <Table
            rows={traindata}
            handleDelete={(id) => this.deleteTrainData(id)}
            name="TrainData"
            one="word"
            two="phoneme"
            three="level"
          />
        </Container>

        <Snackbar
          open={alert}
          autoHideDuration={2000}
          onClose={this.handleCloseAlert}
        >
          <Alert severity="success">Operation Successfully!</Alert>
        </Snackbar>
      </div>
    );
  }
}

export default PhonemeTutorTrain;
