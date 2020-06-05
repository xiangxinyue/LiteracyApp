import React from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container } from "@material-ui/core";
import Table from "../../../components/tutor/phoneme/phonemetable";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PhonemeTutorTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testdata: [],
      testshow: false,
      alert: false,
      testAddWord: "",
      testAddPhoneme: "",
      testAddLevel: "",
    };
  }

  componentDidMount = async () => {
    const testdata = await axios.get("/api/phoneme/test/gettable");
    await this.setState({
      testdata: testdata.data,
    });
  };

  addNewtest = async () => {
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

  deletetestData = async (id) => {
    await axios.post("/api/phoneme/test/delete", { id });
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
    const { testdata, assignNum } = this.state;
    const length = testdata.length;
    const assign = [];
    for (let i = 0; i < assignNum; i++) {
      const index = Math.floor(Math.random() * length);
      console.log("choose", index);
      assign.push(testdata[index]);
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
      testdata,
      alert,
      testAddWord,
      testAddPhoneme,
      testAddLevel,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify the testing data</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/phoneme">
            Go back
          </Button>
        </div>
        <Container>
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
          <Button variant="contained" color="primary" onClick={this.addNewtest}>
            Add New test
          </Button>
          <Table
            rows={testdata}
            handleDelete={(id) => this.deletetestData(id)}
            name="testData"
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

export default PhonemeTutorTest;
