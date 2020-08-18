import React from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container } from "@material-ui/core";
import Table from "../../../components/tutor/print/data-table/q2-table";
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
      choices: [],
      curr_choice: "",
      answer: "",
      alert: false,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/print/q2");
    this.setState({ q: doc.data });
  };

  addData = async () => {
    const { level, question, choices, answer } = this.state;
    await axios.post("/api/print/q2", {
      level: level,
      question: question,
      answer: answer,
      choices: choices,
    });
    this.setState({
      level: "",
      question: "",
      choices: [],
      answer: "",
    });
    this.componentDidMount();
  };

  deleteData = async (row) => {
    await axios.delete("/api/print/q2/" + row._id);
    this.componentDidMount();
  };

  render() {
    const {
      q,
      level,
      question,
      answer,
      choices,
      curr_choice,
      alert,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify Print Question 2 Data</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/print">
            Go back
          </Button>
        </div>
        <Container>
          <h5>
            Example: From the list of options below, choose all the correct ways
            that the sound /f/ can be spelled?
          </h5>
          <li>/ff/</li>
          <li>/fg/</li>
          <li>/ft/</li>
          <TextField
            label="level"
            value={level}
            autoComplete="off"
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ level: e.target.value })}
          />
          <TextField
            label="question"
            style={{ width: 500 }}
            autoComplete="off"
            value={question}
            onChange={(e) => this.setState({ question: e.target.value })}
          />
          <br />
          <TextField
            label="answer"
            autoComplete="off"
            value={answer}
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ answer: e.target.value })}
          />
          <TextField
            label="choices"
            autoComplete="off"
            value={curr_choice}
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ curr_choice: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 10, marginRight: 10 }}
            onClick={() =>
              this.setState((state) => {
                const choices = state.choices;
                choices.push(curr_choice);
                this.setState({ curr_choice: "" });
                return { choices, ...state };
              })
            }
          >
            Add a choice
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: 10 }}
            onClick={() => this.setState({ choices: [] })}
          >
            empty Choices
          </Button>
          <div className="row" style={{ marginTop: 10, marginLeft: 10 }}>
            <h5>Answers you entered:</h5>
            <h4>{choices.map((choice) => choice + ",")}</h4>
          </div>
          <h5>(You can provide multiple choices, but do not include / )</h5>
          <Button variant="contained" color="primary" onClick={this.addData}>
            Add an Entry
          </Button>
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
