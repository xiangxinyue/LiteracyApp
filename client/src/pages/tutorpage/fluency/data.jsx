import React from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container, Snackbar } from "@material-ui/core";
import Table from "../../../assets/table/fluencytable";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class FluencyTutorTrainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      traindata: [],
      alert: false,
      trainAddParagraph: "",
      trainAddQuestion: "",
      trainAddChoice1: "",
      trainAddChoice2: "",
      trainAddChoice3: "",
      trainAddChoice4: "",
      trainAddAnswer: "",
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/fluency/data/table");
    console.log(doc.data);
    this.setState({ traindata: doc.data });
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
    await axios.post("/api/fluency/assign", { data });
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

  deleteTrainData = async (id) => {
    await axios.delete("/api/fluency/assign", { id });
    this.componentDidMount();
    this.setState({ alert: true });
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ alert: false });
  };

  render() {
    const {
      traindata,
      alert,
      trainAddParagraph,
      trainAddQuestion,
      trainAddChoice1,
      trainAddChoice2,
      trainAddChoice3,
      trainAddChoice4,
      trainAddAnswer,
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify Assignment Data</h2>
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
            value={trainAddParagraph}
            autoComplete="off"
            onChange={(e) =>
              this.setState({ trainAddParagraph: e.target.value })
            }
          />
          <br />
          <TextField
            id="standard-multiline-flexible"
            label="Question"
            multiline
            style={{ width: 600 }}
            rowsMax={20}
            value={trainAddQuestion}
            autoComplete="off"
            onChange={(e) =>
              this.setState({ trainAddQuestion: e.target.value })
            }
          />
          <br />
          <TextField
            id="standard-basic"
            label="Choice1"
            value={trainAddChoice1}
            autoComplete="off"
            style={{ width: 300 }}
            onChange={(e) => this.setState({ trainAddChoice1: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Choice2"
            autoComplete="off"
            value={trainAddChoice2}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ trainAddChoice2: e.target.value })}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Choice3"
            autoComplete="off"
            value={trainAddChoice3}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ trainAddChoice3: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Choice4"
            autoComplete="off"
            value={trainAddChoice4}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ trainAddChoice4: e.target.value })}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Answer"
            autoComplete="off"
            value={trainAddAnswer}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ trainAddAnswer: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 10, marginLeft: 10 }}
            onClick={this.addNewTrain}
          >
            Add
          </Button>
          <Table
            rows={traindata}
            handleDelete={(id) => this.deleteTrainData(id)}
            name="TrainData"
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

export default FluencyTutorTrainPage;
