import React from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container } from "@material-ui/core";
import Table from "../../../components/tutor/meaning/data-table/q3-table";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class MeaningData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: [],
      level: "",
      question: "",
      choice1: "",
      choice2: "",
      choice3: "",
      choice4: "",
      answer: "",
      alert: false,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/meaning/q3");
    this.setState({ q: doc.data });
  };

  addData = async () => {
    const {
      level,
      question,
      choice1,
      choice2,
      choice3,
      choice4,
      answer,
    } = this.state;
    await axios.post("/api/meaning/q3", {
      level,
      question,
      choices: [choice1, choice2, choice3, choice4],
      answer,
    });
    await this.setState({
      level: "",
      question: "",
      choice1: "",
      choice2: "",
      choice3: "",
      choice4: "",
      answer: "",
    });
    this.componentDidMount();
  };

  deleteData = async (row) => {
    await axios.delete("/api/meaning/q3/" + row._id);
    this.componentDidMount();
  };
  render() {
    const {
      q,
      level,
      question,
      choice1,
      choice2,
      choice3,
      choice4,
      answer,
      alert,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify meaning Question 3 data</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/meaning">
            Go back
          </Button>
        </div>
        <Container>
          <h4>
            You will see sentences with a blank, followed by four options. Read
            the sentence and select the nonsense word that best fits the
            sentence. See the example below
          </h4>
          <h5>
            Despite her knowledge, the _____ was unable to respond to the
            question.
          </h5>
          <li>floxatize</li>
          <li>floxatism</li>
          <li>floxatist</li>
          <li>floxatation</li>
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
            label="choice3"
            value={choice3}
            autoComplete="off"
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ choice3: e.target.value })}
          />
          <TextField
            label="choice4"
            value={choice4}
            autoComplete="off"
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ choice4: e.target.value })}
          />
          <TextField
            label="answer"
            autoComplete="off"
            value={answer}
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ answer: e.target.value })}
          />
          <br />
          <br />
          <Button variant="outlined" color="primary" onClick={this.addData}>
            Add a question
          </Button>
          <br />
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

export default MeaningData;
