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
    const traindata = await axios.get("/api/fluency/train/gettable");
    await this.setState({
      traindata: traindata.data,
    });
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
    await axios.post("/api/fluency/train/add", { data });
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
    await axios.post("/api/fluency/train/delete", { id });
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
          <h2>Modify training data</h2>
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
            onChange={(e) =>
              this.setState({ trainAddQuestion: e.target.value })
            }
          />
          <br />
          <TextField
            id="standard-basic"
            label="Choice1"
            value={trainAddChoice1}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ trainAddChoice1: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Choice2"
            value={trainAddChoice2}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ trainAddChoice2: e.target.value })}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Choice3"
            value={trainAddChoice3}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ trainAddChoice3: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Choice4"
            value={trainAddChoice4}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ trainAddChoice4: e.target.value })}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Answer"
            value={trainAddAnswer}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ trainAddAnswer: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.addNewTrain}
          >
            Add New Train
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
