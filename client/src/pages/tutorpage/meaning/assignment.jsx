import React from "react";
import axios from "axios";
import { TextField, Button, Container } from "@material-ui/core";
import Q1Table from "../../../components/tutor/meaning/data-table/q1-table";
import Q2Table from "../../../components/tutor/meaning/data-table/q2-table";
import Q3Table from "../../../components/tutor/meaning/data-table/q3-table";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

class MeaningData extends React.Component {
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
      schedule: null,
      q1_num: 0,
      q2_num: 0,
      q3_num: 0,
    };
  }

  generateQ1Date = async () => {
    const { q1_num } = this.state;
    const doc = await axios.get("/api/print/q1/alldata");
    const q1 = doc.data.filter((question, index) => index < q1_num);
    this.setState({ q1 });
  };

  generateQ2Date = async () => {
    const { q2_num } = this.state;
    const doc = await axios.get("/api/print/q2/alldata");
    const q2 = doc.data.filter((question, index) => index < q2_num);
    this.setState({ q2 });
  };

  generateQ3Date = async () => {
    const { q3_num } = this.state;
    const doc = await axios.get("/api/print/q3/alldata");
    const q3 = doc.data.filter((question, index) => index < q3_num);
    this.setState({ q3 });
  };

  addQ1Data = async () => {
    this.setState((state) => {
      const newQ1 = state.q1;
      newQ1.push({
        level: state.q1_level,
        question: state.q1_question,
        answer: state.q1_answer,
      });
      return {
        ...state,
        q1: newQ1,
        q1_level: "",
        q1_question: "",
        q1_answer: [],
      };
    });
  };

  addQ2Data = async () => {
    this.setState((state) => {
      const newQ2 = state.q2;
      newQ2.push({
        level: state.q2_level,
        question: state.q2_question,
        answer: state.q2_answer,
        choices: state.q2_choices,
      });
      return {
        ...state,
        q2: newQ2,
        q2_level: "",
        q2_question: "",
        q2_answer: "",
        q2_choices: [],
      };
    });
  };

  addQ3Data = async () => {
    this.setState((state) => {
      const newQ3 = state.q3;
      newQ3.push({
        level: state.q3_level,
        question: state.q3_question,
        choices: state.q3_choices,
      });
      return {
        ...state,
        q3: newQ3,
        q3_level: "",
        q3_question: "",
        q3_choices: [],
      };
    });
  };

  deleteQ1 = async (row) => {
    this.setState((state) => {
      const q1 = state.q1.filter((data) => data !== row);
      return { ...state, q1 };
    });
  };

  deleteQ2 = async (row) => {
    this.setState((state) => {
      const q2 = state.q2.filter((data) => data !== row);
      return { ...state, q2 };
    });
  };

  deleteQ3 = async (row) => {
    this.setState((state) => {
      const q3 = state.q3.filter((data) => data !== row);
      return { ...state, q3 };
    });
  };

  handleCreate = async () => {
    const { q1, q2, q3, schedule } = this.state;
    await axios.post("/api/print/eval", {
      q1Assign: q1,
      q2Assign: q2,
      q3Assign: q3,
      schedule,
    });
    window.location = "/tutor/print";
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
      schedule,
      q1_num,
      q2_num,
      q3_num,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Create new Print Evaluation Assignment</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/meaning">
            Go back
          </Button>
        </div>
        <Container>
          <h3>Question 1 data</h3>
          <TextField
            label="Number"
            value={q1_num}
            onChange={(e) => this.setState({ q1_num: e.target.value })}
          />
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
                return { ...state, q1_answer };
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
          <Button
            variant="outlined"
            color="primary"
            onClick={this.generateQ1Date}
          >
            Generate Automatically
          </Button>
          <Q1Table data={q1} handleDelete={this.deleteQ1} />
        </Container>
        <hr />
        <Container>
          <h3>Question 2 data</h3>
          <TextField
            label="Number"
            value={q2_num}
            onChange={(e) => this.setState({ q2_num: e.target.value })}
          />
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
                return { ...state, q2_choices };
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
          <Button
            variant="outlined"
            color="primary"
            onClick={this.generateQ2Date}
          >
            Generate Automatically
          </Button>
          <Q2Table data={q2} handleDelete={this.deleteQ2} />
        </Container>
        <hr />
        <Container>
          <h3>Question 3 data</h3>
          <TextField
            label="Number"
            value={q3_num}
            onChange={(e) => this.setState({ q3_num: e.target.value })}
          />
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
                  ...state,
                  q3_choices,
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
          <Button
            variant="outlined"
            color="primary"
            onClick={this.generateQ3Date}
          >
            Generate Automatically
          </Button>
          <Q3Table data={q3} handleDelete={this.deleteQ3} />
        </Container>
        <hr />
        <Container className="row">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={schedule}
              onChange={(date) =>
                this.setState({ schedule: date }, console.log(date))
              }
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleCreate}
          >
            Create
          </Button>
        </Container>
      </div>
    );
  }
}

export default MeaningData;
