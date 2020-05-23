import React from "react";
import crypto from "crypto";
import { connect } from "react-redux";
import axios from "axios";
// UI
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button } from "@material-ui/core";
import Table from "../../assets/table/phonemetable";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PhonemeAssignPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      traindata: [],
      testdata: [],
      trainshow: false,
      testshow: false,
      alert: false,
      trainAddWord: "",
      trainAddPhoneme: "",
      trainAddLevel: "",
      testAddWord: "",
      testAddPhoneme: "",
      testAddLevel: "",
      assignAddWord: "",
      assignAddPhoneme: "",
      assignAddLevel: "",
      assigndata: [],
      assignNum: 20,
      assignEntryShow: false,
    };
  }

  componentDidMount = async () => {
    const testdata = await axios.get("/api/phoneme/test/gettable");
    const traindata = await axios.get("/api/phoneme/train/gettable");
    await this.setState({
      traindata: traindata.data,
      testdata: testdata.data,
    });
    console.log(this.state);
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
      testdata,
      trainshow,
      testshow,
      alert,
      trainAddWord,
      trainAddPhoneme,
      trainAddLevel,
      testAddWord,
      testAddPhoneme,
      testAddLevel,
      assignAddWord,
      assignAddPhoneme,
      assignAddLevel,
      assigndata,
      assignNum,
      assignEntryShow,
    } = this.state;

    return (
      <div>
        <div className="container">
          <TextField
            id="standard-basic"
            label="Word"
            value={trainAddWord}
            onChange={(e) => this.setState({ trainAddWord: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Phoneme"
            value={trainAddPhoneme}
            onChange={(e) => this.setState({ trainAddPhoneme: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Level"
            value={trainAddLevel}
            onChange={(e) => this.setState({ trainAddLevel: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.addNewTrain}
          >
            Add New Train
          </Button>
          <Button onClick={() => this.setState({ trainshow: !trainshow })}>
            Show/Close Train Data
          </Button>
          {trainshow ? (
            <Table
              rows={traindata}
              handleDelete={(id) => this.deleteTrainData(id)}
              name="TrainData"
              one="word"
              two="phoneme"
              three="level"
            />
          ) : null}
        </div>
        <hr />
        <div className="container">
          <TextField
            id="standard-basic"
            label="Word"
            value={testAddWord}
            onChange={(e) => this.setState({ testAddWord: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Phoneme"
            value={testAddPhoneme}
            onChange={(e) => this.setState({ testAddPhoneme: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Level"
            value={testAddLevel}
            onChange={(e) => this.setState({ testAddLevel: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={this.addNewTest}>
            Add New Test
          </Button>
          <Button onClick={() => this.setState({ testshow: !testshow })}>
            Show/Close Test Data
          </Button>
          {testshow ? (
            <Table
              rows={testdata}
              handleDelete={(id) => this.deleteTestData(id)}
              name="TestData"
              one="word"
              two="phoneme"
              three="level"
            />
          ) : null}
        </div>
        <hr />
        <div className="container">
          {!assignEntryShow ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.setState({ assignEntryShow: !assignEntryShow })
              }
            >
              Create New Assignment
            </Button>
          ) : (
            <div>
              <p>New Assignment</p>
              <br />
              {assigndata.length != assignNum ? (
                <div>
                  <TextField
                    id="standard-basic"
                    label="Number of questions"
                    value={assignNum}
                    onChange={(e) =>
                      this.setState({ assignNum: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Word"
                    value={assignAddWord}
                    onChange={(e) =>
                      this.setState({ assignAddWord: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Phoneme"
                    value={assignAddPhoneme}
                    onChange={(e) =>
                      this.setState({ assignAddPhoneme: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Level"
                    value={assignAddLevel}
                    onChange={(e) =>
                      this.setState({ assignAddLevel: e.target.value })
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.addNewAssignEntry}
                  >
                    Add New Entry
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.generateAssign}
                  >
                    Generate assignment
                  </Button>
                </div>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.addNewAssign}
                >
                  Submit New Assignment
                </Button>
              )}
              <Table
                rows={assigndata}
                handleDelete={(id) => this.deleteAssignEntry(id)}
                name="New Assignment"
                one="word"
                two="phoneme"
                three="level"
              />
            </div>
          )}
        </div>

        <Snackbar
          open={alert}
          autoHideDuration={2000}
          onClose={this.handleCloseAlert}
        >
          <Alert onClose={this.handleClose} severity="success">
            Operation Successfully!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PhonemeAssignPart);
