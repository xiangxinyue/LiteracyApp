import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container, Snackbar } from "@material-ui/core";
import Table from "../../../assets/table/phonemetable";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PhonemeTutorAssign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      traindata: [],
      assignAddWord: "",
      assignAddPhoneme: "",
      assignAddLevel: "",
      assigndata: [],
      assignNum: 20,
      alert: false,
    };
  }

  componentDidMount = async () => {
    const traindata = await axios.get("/api/phoneme/train/gettable");
    await this.setState({
      traindata: traindata.data,
    });
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
      assignAddWord,
      assignAddPhoneme,
      assignAddLevel,
      assigndata,
      assignNum,
      alert,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Create new Phoneme Assignment</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/phoneme">
            Go Back
          </Button>
        </div>
        <Container>
          {assigndata.length != assignNum ? (
            <div>
              <TextField
                id="standard-basic"
                label="Number of questions"
                value={assignNum}
                onChange={(e) => this.setState({ assignNum: e.target.value })}
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
        </Container>
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

export default connect(mapStateToProps)(PhonemeTutorAssign);
