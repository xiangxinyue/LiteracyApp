import React from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container } from "@material-ui/core";
import Q1Table from "../../../components/tutor/meaning/data-table/q1-table";
import Q2Table from "../../../components/tutor/meaning/data-table/q2-table";
import Q3Table from "../../../components/tutor/meaning/data-table/q3-table";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    };
  }

  componentDidMount = () => {
    this.renderQ1Data();
    this.renderQ2Data();
    this.renderQ3Data();
  };

  renderQ1Data = async () => {
    const doc = await axios.get("/api/meaning/q1/alldata");
    this.setState({ q1: doc.data });
  };

  renderQ2Data = async () => {
    const doc = await axios.get("/api/meaning/q2/alldata");
    this.setState({ q2: doc.data });
  };

  renderQ3Data = async () => {
    const doc = await axios.get("/api/meaning/q3/alldata");
    this.setState({ q3: doc.data });
  };

  addQ1Data = async () => {
    const { q1_level, q1_question, q1_answer } = this.state;
    await axios.post("/api/meaning/q1/onedata", {
      level: q1_level,
      question: q1_question,
      answer: q1_answer,
    });
    this.renderQ1Data();
  };

  addQ2Data = async () => {
    const { q2_level, q2_question, q2_answer } = this.state;
    await axios.post("/api/meaning/q2/onedata", {
      level: q2_level,
      question: q2_question,
      answer: q2_answer,
    });
    this.renderQ2Data();
  };

  addQ3Data = async () => {
    const { q3_level, q3_question, q3_answer } = this.state;
    await axios.post("/api/meaning/q3/onedata", {
      level: q3_level,
      question: q3_question,
      answer: q3_answer,
    });
    this.renderQ3Data();
  };

  deleteQ1 = async (row) => {
    await axios.delete("/api/meaning/q1/onedata/" + row._id);
    this.renderQ1Data();
  };

  deleteQ2 = async (row) => {
    await axios.delete("/api/meaning/q2/onedata/" + row._id);
    this.renderQ2Data();
  };

  deleteQ3 = async (row) => {
    await axios.delete("/api/meaning/q3/onedata/" + row._id);
    this.renderQ3Data();
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
      alert,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify the Meaning training data</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/meaning">
            Go back
          </Button>
        </div>
        <Container>
          <h3>Modify Question 1 data</h3>
          <TextField
            label="level"
            value={q1_level}
            autoComplete="off"
            onChange={(e) => this.setState({ q1_level: e.target.value })}
          />
          <TextField
            label="question"
            style={{ width: 500 }}
            value={q1_question}
            autoComplete="off"
            onChange={(e) => this.setState({ q1_question: e.target.value })}
          />
          <br />
          <TextField
            label="answer"
            value={q1_curr_answer}
            autoComplete="off"
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
            autoComplete="off"
            onChange={(e) => this.setState({ q2_level: e.target.value })}
          />
          <TextField
            label="question"
            style={{ width: 500 }}
            value={q2_question}
            autoComplete="off"
            onChange={(e) => this.setState({ q2_question: e.target.value })}
          />
          <br />
          <TextField
            label="answer"
            value={q2_curr_answer}
            autoComplete="off"
            onChange={(e) => this.setState({ q2_curr_answer: e.target.value })}
          />
          <Button
            variant="outlined"
            color="default"
            onClick={() =>
              this.setState((state) => {
                const q2_answer = state.q2_answer;
                q2_answer.push(q2_curr_answer);
                this.setState({ q2_curr_answer: "" });
                return { q2_answer, ...state };
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
          <Q2Table data={q2} handleDelete={this.deleteQ2} />
        </Container>

        <hr />

        <Container>
          <h3>Modify Question 3 data</h3>
          <TextField
            label="level"
            value={q3_level}
            autoComplete="off"
            onChange={(e) => this.setState({ q3_level: e.target.value })}
          />
          <TextField
            label="question"
            style={{ width: 500 }}
            value={q3_question}
            autoComplete="off"
            onChange={(e) => this.setState({ q3_question: e.target.value })}
          />
          <br />
          <TextField
            label="answer"
            value={q3_curr_answer}
            autoComplete="off"
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
                return { q3_answer, ...state };
              })
            }
          >
            Add an answer
          </Button>
          <br />
          <h4>
            Answers you entered: {q3_answer.map((answer) => answer + ",")}
          </h4>

          <Button variant="outlined" color="primary" onClick={this.addQ3Data}>
            Add an Entry
          </Button>

          <Q3Table data={q3} handleDelete={this.deleteQ3} />
        </Container>

        <hr />

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

export default MeaningData;
