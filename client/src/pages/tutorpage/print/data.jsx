import React from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container } from "@material-ui/core";
import Q1Table from "../../../components/tutor/print/q1-table";
import Q2Table from "../../../components/tutor/print/q2-table";
import Q3Table from "../../../components/tutor/print/q3-table";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PrintData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q1: [],
      q2: [],
      q3: [],
      q1_level: "",
      q1_question: "",
      q1_answer: [],
      q1_curr_answer: "",
      q2_level: "",
      q2_question: "",
      q2_choices: [],
      q2_curr_choice: "",
      q2_answer: "",
      q3_level: "",
      q3_question: "",
      q3_choice1: "",
      q3_choice2: "",
      q3_answer: "",
      q3_choices: [],
      alert: false,
    };
  }

  componentDidMount = async () => {
    const doc1 = await axios.get("/api/print/q1/alldata");
    const doc2 = await axios.get("/api/print/q2/alldata");
    const doc3 = await axios.get("/api/print/q3/alldata");
    this.setState({ q1: doc1.data, q2: doc2.data, q3: doc3.data });
  };

  addQ1Data = async () => {
    const { q1_level, q1_question, q1_answer } = this.state;
    await axios.post("/api/print/q1/onedata", {
      level: q1_level,
      question: q1_question,
      answer: q1_answer,
    });
    window.location = "/tutor/print/data";
  };

  addQ2Data = async () => {
    const { q2_level, q2_question, q2_choices, q2_answer } = this.state;
    await axios.post("/api/print/q2/onedata", {
      level: q2_level,
      question: q2_question,
      answer: q2_answer,
      choices: q2_choices,
    });
    window.location = "/tutor/print/data";
  };

  addQ3Data = async () => {
    const { q3_level, q3_question, q3_choices } = this.state;
    await axios.post("/api/print/q3/onedata", {
      level: q3_level,
      question: q3_question,
      choices: q3_choices,
    });
    window.location = "/tutor/print/data";
  };

  deleteQ1 = async (id) => {
    await axios.delete("/api/print/q1/onedata/" + id);
    window.location = "/tutor/print/data";
  };

  deleteQ2 = async (id) => {
    await axios.delete("/api/print/q2/onedata/" + id);
    window.location = "/tutor/print/data";
  };

  deleteQ3 = async (id) => {
    await axios.delete("/api/print/q3/onedata/" + id);
    window.location = "/tutor/print/data";
  };
  render() {
    const {
      q1,
      q2,
      q3,
      q1_level,
      q1_question,
      q1_answer,
      q1_curr_answer,
      q2_level,
      q2_question,
      q2_answer,
      q2_choices,
      q2_curr_choice,
      q3_level,
      q3_question,
      q3_choice1,
      q3_choice2,
      q3_answer,
      q3_choices,
      alert,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify the Print training data</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/print">
            Go back
          </Button>
        </div>
        <Container>
          <h3>Modify Question 1 data</h3>
          <TextField
            label="level"
            value={q1_level}
            onChange={(e) => this.setState({ q1_level: e.target.value })}
          />
          <TextField
            label="question"
            style={{ width: 500 }}
            value={q1_question}
            onChange={(e) => this.setState({ q1_question: e.target.value })}
          />
          <br />
          <TextField
            label="answer"
            value={q1_curr_answer}
            onChange={(e) => this.setState({ q1_curr_answer: e.target.value })}
          />
          <Button
            variant="outlined"
            color="default"
            onClick={() =>
              this.setState((state) => {
                const q1_answer = state.q1_answer;
                q1_answer.push(q1_curr_answer);
                this.setState({ q1_curr_answer: "" });
                return { q1_answer, ...state };
              })
            }
          >
            Add an answer
          </Button>
          <br />
          <h4>
            Answers you entered: {q1_answer.map((answer) => answer + ",")}
          </h4>

          <Button variant="outlined" color="primary" onClick={this.addQ1Data}>
            Add an Entry
          </Button>

          <Q1Table data={q1} handleDelete={this.deleteQ1} />
        </Container>
        <hr />
        <Container>
          <h3>Modify Question 2 data</h3>
          <TextField
            label="level"
            value={q2_level}
            onChange={(e) => this.setState({ q2_level: e.target.value })}
          />
          <TextField
            label="question"
            style={{ width: 500 }}
            value={q2_question}
            onChange={(e) => this.setState({ q2_question: e.target.value })}
          />
          <br />
          <TextField
            label="answer"
            value={q2_answer}
            onChange={(e) => this.setState({ q2_answer: e.target.value })}
          />
          <TextField
            label="choices"
            value={q2_curr_choice}
            onChange={(e) => this.setState({ q2_curr_choice: e.target.value })}
          />
          <Button
            variant="outlined"
            color="default"
            onClick={() =>
              this.setState((state) => {
                const q2_choices = state.q2_choices;
                q2_choices.push(q2_curr_choice);
                this.setState({ q2_curr_choice: "" });
                return { q2_choices, ...state };
              })
            }
          >
            Add a Choice
          </Button>
          <h4>
            Choices you entered: {q2_choices.map((choice) => choice + ",")}
          </h4>
          <Button variant="outlined" color="primary" onClick={this.addQ2Data}>
            Add an Entry
          </Button>
          <Q2Table data={q2} handleDelete={this.deleteQ2} />
        </Container>
        <hr />
        <Container>
          <h3>Modify Question 3 data</h3>
          <TextField
            label="level"
            value={q3_level}
            onChange={(e) => this.setState({ q3_level: e.target.value })}
          />
          <TextField
            label="question"
            value={q3_question}
            style={{ width: 500 }}
            onChange={(e) => this.setState({ q3_question: e.target.value })}
          />
          <br />
          <TextField
            label="choice1"
            value={q3_choice1}
            onChange={(e) => this.setState({ q3_choice1: e.target.value })}
          />
          <TextField
            label="choice2"
            value={q3_choice2}
            onChange={(e) => this.setState({ q3_choice2: e.target.value })}
          />
          <TextField
            label="answer"
            value={q3_answer}
            onChange={(e) => this.setState({ q3_answer: e.target.value })}
          />
          <Button
            variant="outlined"
            color="default"
            onClick={() => {
              this.setState((state) => {
                const { q3_choice1, q3_choice2, q3_answer, q3_choices } = state;
                const newChoice = {
                  choice1: q3_choice1,
                  choice2: q3_choice2,
                  answer: q3_answer,
                };
                q3_choices.push(newChoice);
                this.setState({
                  q3_choice1: "",
                  q3_choice2: "",
                  q3_answer: "",
                });
                return {
                  q3_choices,
                  ...state,
                };
              });
            }}
          >
            Add a choice
          </Button>
          <h4>
            Choices you entered:{" "}
            {q3_choices.map(
              (choice) =>
                choice.choice1 +
                "/" +
                choice.choice2 +
                "/" +
                choice.answer +
                ","
            )}
          </h4>
          <Button variant="outlined" color="primary" onClick={this.addQ3Data}>
            Add an Entry
          </Button>
          <Q3Table data={q3} handleDelete={this.deleteQ3} />
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
