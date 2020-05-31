import React from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container, Snackbar } from "@material-ui/core";
import Table from "../../../assets/table/fluencytable";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class FluencyTutorTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testdata: [],
      alert: false,
      testAddParagraph: "",
      testAddQuestion: "",
      testAddChoice1: "",
      testAddChoice2: "",
      testAddChoice3: "",
      testAddChoice4: "",
      testAddAnswer: "",
    };
  }

  componentDidMount = async () => {
    const testdata = await axios.get("/api/fluency/test/gettable");
    await this.setState({
      testdata: testdata.data,
    });
  };

  addNewTest = async () => {
    const {
      testAddParagraph,
      testAddQuestion,
      testAddChoice1,
      testAddChoice2,
      testAddChoice3,
      testAddChoice4,
      testAddAnswer,
    } = this.state;
    const data = {
      paragraph: testAddParagraph,
      question: testAddQuestion,
      choices: [testAddChoice1, testAddChoice2, testAddChoice3, testAddChoice4],
      answer: testAddAnswer,
    };
    await axios.post("/api/fluency/test/add", { data });
    await this.setState({
      alert: true,
      testAddParagraph: "",
      testAddQuestion: "",
      testAddChoice1: "",
      testAddChoice2: "",
      testAddChoice3: "",
      testAddChoice4: "",
      testAddAnswer: "",
    });
    this.componentDidMount();
  };

  deleteTestData = async (id) => {
    await axios.post("/api/fluency/test/delete", { id });
    this.componentDidMount();
    this.setState({ alert: true });
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ alert: false });
  };

  render() {
    const {
      testAddParagraph,
      testAddQuestion,
      testAddChoice1,
      testAddChoice2,
      testAddChoice3,
      testAddChoice4,
      testAddAnswer,
      testdata,
      alert,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify testing data</h2>
          <Button variant="contained" color="default" href="/tutor/fluency">
            Go Back
          </Button>
        </div>
        <Container>
          <TextField
            id="standard-multiline-flexible"
            label="Paragraphy"
            multiline
            style={{ width: 600 }}
            rowsMax={20}
            value={testAddParagraph}
            onChange={(e) =>
              this.setState({ testAddParagraph: e.target.value })
            }
          />
          <br />
          <TextField
            id="standard-multiline-flexible"
            label="Question"
            multiline
            style={{ width: 600 }}
            rowsMax={20}
            value={testAddQuestion}
            onChange={(e) => this.setState({ testAddQuestion: e.target.value })}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Choice1"
            value={testAddChoice1}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ testAddChoice1: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Choice2"
            value={testAddChoice2}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ testAddChoice2: e.target.value })}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Choice3"
            value={testAddChoice3}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ testAddChoice3: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Choice4"
            value={testAddChoice4}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ testAddChoice4: e.target.value })}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Answer"
            value={testAddAnswer}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ testAddAnswer: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={this.addNewTest}>
            Add New Train
          </Button>
          <Table
            rows={testdata}
            handleDelete={(id) => this.deleteTestData(id)}
            name="TestData"
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

export default FluencyTutorTestPage;
