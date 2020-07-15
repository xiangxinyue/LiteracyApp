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
      q2_answer: [],
      q2_curr_answer: "",

      q3_level: "",
      q3_question: "",
      q3_answer: [],
      q3_curr_answer: "",
      alert: false,
      schedule: null,
      q1_num: 0,
      q2_num: 0,
      q3_num: 0,
    };
  }

  generateQ1Date = async () => {
    const { q1_num } = this.state;
    const doc = await axios.get("/api/meaning/q1/alldata");
    const q1 = doc.data.filter((question, index) => index < q1_num);
    this.setState({ q1 });
  };

  generateQ2Date = async () => {
    const { q2_num } = this.state;
    const doc = await axios.get("/api/meaning/q2/alldata");
    const q2 = doc.data.filter((question, index) => index < q2_num);
    this.setState({ q2 });
  };

  generateQ3Date = async () => {
    const { q3_num } = this.state;
    const doc = await axios.get("/api/meaning/q3/alldata");
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
      });
      return {
        ...state,
        q2: newQ2,
        q2_level: "",
        q2_question: "",
        q2_answer: [],
      };
    });
  };

  addQ3Data = async () => {
    this.setState((state) => {
      const newQ3 = state.q3;
      newQ3.push({
        level: state.q3_level,
        question: state.q3_question,
        answer: state.q3_answer,
      });
      return {
        ...state,
        q3: newQ3,
        q3_level: "",
        q3_question: "",
        q3_answer: [],
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
    await axios.post("/api/meaning/eval", {
      q1Assign: q1,
      q2Assign: q2,
      q3Assign: q3,
      schedule,
    });
    window.location = "/tutor/meaning";
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
      q2_curr_answer,
      q3_level,
      q3_question,
      q3_answer,
      q3_curr_answer,
      schedule,
      q1_num,
      q2_num,
      q3_num,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Create new Meaning Evaluation Assignment</h2>
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
            value={q2_curr_answer}
            onChange={(e) => this.setState({ q2_curr_answer: e.target.value })}
          />
          <Button
            variant="outlined"
            color="default"
            onClick={() =>
              this.setState((state) => {
                const q2_answer = state.q2_answer;
                q1_answer.push(q2_curr_answer);
                this.setState({ q2_curr_answer: "" });
                return { ...state, q2_answer };
              })
            }
          >
            Add an answer
          </Button>
          <br />
          <h4>
            Answers you entered: {q2_answer.map((answer) => answer + ",")}
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
            style={{ width: 500 }}
            value={q3_question}
            onChange={(e) => this.setState({ q3_question: e.target.value })}
          />
          <br />
          <TextField
            label="answer"
            value={q3_curr_answer}
            onChange={(e) => this.setState({ q3_curr_answer: e.target.value })}
          />
          <Button
            variant="outlined"
            color="default"
            onClick={() =>
              this.setState((state) => {
                const q3_answer = state.q3_answer;
                q3_answer.push(q3_curr_answer);
                this.setState({ q3_curr_answer: "" });
                return { ...state, q3_answer };
              })
            }
          >
            Add an answer
          </Button>
          <br />
          <h4>
            Answers you entered: {q1_answer.map((answer) => answer + ",")}
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
