import React from "react";
import crypto from "crypto";
import { connect } from "react-redux";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import {
  TextField,
  Button,
  Container,
  Snackbar,
  Grid,
} from "@material-ui/core";
import Table from "../../../assets/table/fluencytable";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class FluencyTutorAssignPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      traindata: [],
      assigndata: [],
      assignAddParagraph: "",
      assignAddQuestion: "",
      assignAddChoice1: "",
      assignAddChoice2: "",
      assignAddChoice3: "",
      assignAddChoice4: "",
      assignAddAnswer: "",
      assignNum: 20,
      selectedDate: null,
    };
  }

  componentDidMount = async () => {
    const traindata = await axios.get("/api/fluency/train/gettable");
    await this.setState({
      traindata: traindata.data,
    });
  };

  addNewAssignEntry = () => {
    const {
      assignAddParagraph,
      assignAddQuestion,
      assignAddChoice1,
      assignAddChoice2,
      assignAddChoice3,
      assignAddChoice4,
      assignAddAnswer,
      assigndata,
    } = this.state;
    const id = crypto.randomBytes(10).toString("hex");
    const newEntry = {
      id,
      paragraph: assignAddParagraph,
      question: assignAddQuestion,
      choices: [
        assignAddChoice1,
        assignAddChoice2,
        assignAddChoice3,
        assignAddChoice4,
      ],
      answer: assignAddAnswer,
    };
    const newAssign = assigndata;
    newAssign.push(newEntry);
    this.setState({
      assigndata: newAssign,
      assignAddParagraph: "",
      assignAddQuestion: "",
      assignAddChoice1: "",
      assignAddChoice2: "",
      assignAddChoice3: "",
      assignAddChoice4: "",
      assignAddAnswer: "",
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
    await axios.post("/api/fluency/evalassign/add", {
      data: this.state.assigndata,
      schedule: this.state.selectedDate,
    });
    await this.setState({ alert: true });
    window.location = "/tutor/fluency";
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ alert: false });
  };

  render() {
    const {
      alert,
      assigndata,
      assignAddParagraph,
      assignAddQuestion,
      assignAddChoice1,
      assignAddChoice2,
      assignAddChoice3,
      assignAddChoice4,
      assignAddAnswer,
      assignNum,
      selectedDate,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Creating new fluency assignment</h2>
          <Button variant="contained" color="default" href="/tutor/fluency">
            Go Back
          </Button>
        </div>
        <Container>
          {assigndata.length != assignNum ? (
            <Container>
              <TextField
                id="standard-multiline-flexible"
                label="Number of questions"
                rowsMax={20}
                value={assignNum}
                onChange={(e) => this.setState({ assignNum: e.target.value })}
              />
              <br />
              <TextField
                id="standard-multiline-flexible"
                label="Paragraphy"
                multiline
                style={{ width: 600 }}
                rowsMax={20}
                value={assignAddParagraph}
                onChange={(e) =>
                  this.setState({ assignAddParagraph: e.target.value })
                }
              />
              <br />
              <TextField
                id="standard-multiline-flexible"
                label="Question"
                multiline
                style={{ width: 600 }}
                rowsMax={20}
                value={assignAddQuestion}
                onChange={(e) =>
                  this.setState({ assignAddQuestion: e.target.value })
                }
              />
              <br />
              <TextField
                id="standard-basic"
                label="Choice1"
                value={assignAddChoice1}
                style={{ width: 300 }}
                onChange={(e) =>
                  this.setState({ assignAddChoice1: e.target.value })
                }
              />
              <TextField
                id="standard-basic"
                label="Choice2"
                value={assignAddChoice2}
                style={{ width: 300 }}
                onChange={(e) =>
                  this.setState({ assignAddChoice2: e.target.value })
                }
              />
              <br />
              <TextField
                id="standard-basic"
                label="Choice3"
                value={assignAddChoice3}
                style={{ width: 300 }}
                onChange={(e) =>
                  this.setState({ assignAddChoice3: e.target.value })
                }
              />
              <TextField
                id="standard-basic"
                label="Choice4"
                value={assignAddChoice4}
                style={{ width: 300 }}
                onChange={(e) =>
                  this.setState({ assignAddChoice4: e.target.value })
                }
              />
              <br />
              <TextField
                id="standard-basic"
                label="Answer"
                value={assignAddAnswer}
                style={{ width: 300 }}
                onChange={(e) =>
                  this.setState({ assignAddAnswer: e.target.value })
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
            </Container>
          ) : (
            <Container className="row">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate}
                  onChange={(date) =>
                    this.setState({ selectedDate: date }, console.log(date))
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
              <Button
                variant="contained"
                color="primary"
                onClick={this.addNewAssign}
              >
                Submit New Assignment
              </Button>
            </Container>
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

export default connect(mapStateToProps)(FluencyTutorAssignPage);
