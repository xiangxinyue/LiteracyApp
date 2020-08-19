import React from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container } from "@material-ui/core";
import Table from "../../../components/tutor/print/data-table/q3-table";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PrintData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: [],
      level: "",
      question: "",
      choice1: "",
      choice2: "",
      answer: "",
      choices: [],
      alert: false,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/print/q3");
    this.setState({ q: doc.data });
  };

  addData = async () => {
    const { level, question, choices } = this.state;
    await axios.post("/api/print/q3", {
      level: level,
      question: question,
      choices: choices,
    });
    await this.setState({
      level: "",
      question: "",
      choice1: "",
      choice2: "",
      answer: "",
      choices: [],
    });
    this.componentDidMount();
  };

  deleteData = async (row) => {
    await axios.delete("/api/print/q3/" + row._id);
    this.componentDidMount();
  };
  render() {
    const {
      q,
      level,
      question,
      choice1,
      choice2,
      answer,
      choices,
      alert,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify Print Question 3 data</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/print">
            Go back
          </Button>
        </div>
        <Container>
          <h5>
            Example: Out of word pairs below, select the one word that looks
            most like it could be a real word in English. For example, out of
            beff-ffeb, the correct answer is beff as the ff letter pattern is
            always present at the end of a word.
          </h5>
          <li>vadd-vaad</li>
          <li>dau-daw</li>
          <li>dau-daw</li>
          <TextField
            label="level"
            value={level}
            autoComplete="off"
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ level: e.target.value })}
          />
          <TextField
            label="question"
            value={question}
            style={{ width: 500 }}
            autoComplete="off"
            onChange={(e) => this.setState({ question: e.target.value })}
          />
          <br />
          <TextField
            label="choice1"
            value={choice1}
            autoComplete="off"
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ choice1: e.target.value })}
          />
          <TextField
            label="choice2"
            value={choice2}
            autoComplete="off"
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ choice2: e.target.value })}
          />
          <TextField
            label="answer"
            autoComplete="off"
            value={answer}
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ answer: e.target.value })}
          />
          <Button
            variant="outlined"
            color="default"
            style={{ marginRight: 10, marginTop: 10 }}
            onClick={() => {
              this.setState((state) => {
                const { choice1, choice2, answer, choices } = state;
                const newChoice = {
                  choice1: choice1,
                  choice2: choice2,
                  answer: answer,
                };
                choices.push(newChoice);
                this.setState({
                  choice1: "",
                  choice2: "",
                  answer: "",
                });
                return {
                  choices,
                  ...state,
                };
              });
            }}
          >
            Add a choice
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: 10 }}
            onClick={() => this.setState({ choices: [] })}
          >
            empty entries
          </Button>
          <div className="row" style={{ marginTop: 10, marginLeft: 10 }}>
            <h5>Choices you entered:</h5>
            <h4>
              {choices.map(
                (choice) =>
                  choice.choice1 +
                  "/" +
                  choice.choice2 +
                  "/" +
                  choice.answer +
                  ","
              )}
            </h4>
          </div>
          <h5>
            (Each entry contains one choice1, one choice2 and one answer, but do
            not include - or / )
          </h5>
          <Button variant="outlined" color="primary" onClick={this.addData}>
            Add a question
          </Button>
          <br />
          <Table data={q} handleDelete={this.deleteData} />
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

export default PrintData;
