import React from "react";
import crypto from "crypto";
import { connect } from "react-redux";
import axios from "axios";
// UI
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button } from "@material-ui/core";
import Table from "../../assets/table/fluencytable";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class FluencyAssignPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      traindata: [],
      testdata: "",
      trainshow: false,
      testshow: false,
      alert: false,
      trainAddParagraph: "",
      trainAddQuestion: "",
      trainAddChoice1: "",
      trainAddChoice2: "",
      trainAddChoice3: "",
      trainAddChoice4: "",
      trainAddAnswer: "",
      testAddParagraph: "",
      assigndata: [],
      assignAddParagraph: "",
      assignAddQuestion: "",
      assignAddChoice1: "",
      assignAddChoice2: "",
      assignAddChoice3: "",
      assignAddChoice4: "",
      assignAddAnswer: "",
      assignNum: 20,
      assignEntryShow: false, // show assignment
    };
  }

  componentDidMount = async () => {
    const testdata = await axios.get("/api/fluency/test/gettable");
    const traindata = await axios.get("/api/fluency/train/gettable");
    await this.setState({
      traindata: traindata.data,
      testdata: testdata.data.paragraph,
    });
  };

  addNewTrain = async () => {
    const {
      trainAddParagraph,
      trainAddQuestion,
      trainAddChoice1,
      trainAddChoice2,
      trainAddChoice3,
      trainAddChoice4,
      trainAddAnswer,
    } = this.state;
    const data = {
      paragraph: trainAddParagraph,
      question: trainAddQuestion,
      choices: [
        trainAddChoice1,
        trainAddChoice2,
        trainAddChoice3,
        trainAddChoice4,
      ],
      answer: trainAddAnswer,
    };
    await axios.post("/api/fluency/train/add", data);
    await this.setState({
      alert: true,
      trainAddParagraph: "",
      trainAddQuestion: "",
      trainAddChoice1: "",
      trainAddChoice2: "",
      trainAddChoice3: "",
      trainAddChoice4: "",
      trainAddAnswer: "",
    });
    this.componentDidMount();
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ alert: false });
  };

  deleteTrainData = async (id) => {
    await axios("/api/fluency/train/delete", { id });
    this.componentDidMount();
    this.setState({ alert: true });
  };

  updateTestData = async () => {
    await axios("/api/fluency/test/update", { data: this.state.testdata });
    this.componentDidMount();
    this.setState({ alert: true });
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
    });
  };

  deleteAssignEntry = (id) => {
    const newAssign = this.state.assigndata.filter((ele) => {
      if (ele.id !== id) return ele;
    });
    this.setState({ assigndata: newAssign });
  };

  addNewAssign = () => {
    axios.post("/api/fluency/assign/add", { data: this.state.assigndata });
  };

  render() {
    const {
      traindata,
      trainshow,
      testshow,
      testdata,
      alert,
      trainAddParagraph,
      trainAddQuestion,
      trainAddChoice1,
      trainAddChoice2,
      trainAddChoice3,
      trainAddChoice4,
      trainAddAnswer,
      assigndata,
      assignAddParagraph,
      assignAddQuestion,
      assignAddChoice1,
      assignAddChoice2,
      assignAddChoice3,
      assignAddChoice4,
      assignAddAnswer,
      assignNum,
      assignEntryShow,
    } = this.state;

    return (
      <div>
        <div className="container">
          <TextField
            id="standard-multiline-flexible"
            label="Paragraphy"
            multiline
            style={{ width: 500 }}
            rowsMax={20}
            value={trainAddParagraph}
            onChange={(e) =>
              this.setState({ trainAddParagraph: e.target.value })
            }
          />
          <TextField
            id="standard-multiline-flexible"
            label="Question"
            multiline
            style={{ width: 500 }}
            rowsMax={20}
            value={trainAddQuestion}
            onChange={(e) =>
              this.setState({ trainAddQuestion: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Choice1"
            value={trainAddChoice1}
            onChange={(e) => this.setState({ trainAddChoice1: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Choice2"
            value={trainAddChoice2}
            onChange={(e) => this.setState({ trainAddChoice2: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Choice3"
            value={trainAddChoice3}
            onChange={(e) => this.setState({ trainAddChoice3: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Choice4"
            value={trainAddChoice4}
            onChange={(e) => this.setState({ trainAddChoice4: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Answer"
            value={trainAddAnswer}
            onChange={(e) => this.setState({ trainAddAnswer: e.target.value })}
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
            />
          ) : null}
        </div>
        <hr />
        <div className="container">
          <TextField
            id="standard-multiline-flexible"
            label="Paragraphy"
            multiline
            style={{ width: 500 }}
            rowsMax={10}
            value={testdata}
            onChange={(e) => this.setState({ testdata: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.updateTestData}
          >
            Update Testing
          </Button>
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
              {assigndata.length !== assignNum ? (
                <div>
                  <TextField
                    id="standard-multiline-flexible"
                    label="Paragraphy"
                    multiline
                    style={{ width: 500 }}
                    rowsMax={20}
                    value={assignAddParagraph}
                    onChange={(e) =>
                      this.setState({ assignAddParagraph: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-multiline-flexible"
                    label="Question"
                    multiline
                    style={{ width: 500 }}
                    rowsMax={20}
                    value={assignAddQuestion}
                    onChange={(e) =>
                      this.setState({ assignAddQuestion: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Choice1"
                    value={assignAddChoice1}
                    onChange={(e) =>
                      this.setState({ assignAddChoice1: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Choice2"
                    value={assignAddChoice2}
                    onChange={(e) =>
                      this.setState({ assignAddChoice2: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Choice3"
                    value={assignAddChoice3}
                    onChange={(e) =>
                      this.setState({ assignAddChoice3: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Choice4"
                    value={assignAddChoice4}
                    onChange={(e) =>
                      this.setState({ assignAddChoice4: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Answer"
                    value={assignAddAnswer}
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
          onClose={this.handleClose}
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

export default connect(mapStateToProps)(FluencyAssignPart);
