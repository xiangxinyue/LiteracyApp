import React from "react";
import axios from "axios";
import Q1Table from "../assets/q1-table";
import Q2Table from "../assets/q2-table";
import Q3Table from "../assets/q3-table";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class PrintTrainPart extends React.Component {
  constructor() {
    super();
    this.state = {
      q1: [],
      q2: [],
      q3: [],
      q1Index: 0,
      q2Index: 0,
      q3Index: 0,
      q1Score: 0,
      q2Score: 0,
      q2Score: 0,
      q1Assign: [],
      q2Assign: [],
      q3Assign: [],
      q_show: 0,
      alert: false,
    };
  }

  componentDidMount = async () => {
    console.log("arrive at the progress part");
    const doc = await axios.get("/api/print/student/progress/" + this.props.id);
    console.log(doc.data);
    const {
      q1Assign,
      q1Questions,
      q1Score,
      q1Index,
      q2Assign,
      q2Questions,
      q2Score,
      q2Index,
      q3Assign,
      q3Questions,
      q3Score,
      q3Index,
    } = doc.data;
    if (q3Assign.length !== 0) {
      this.setState({
        q1Score: q1Score,
        q2Score: q2Score,
        q3Score: q3Score,
        q1Assign,
        q2Assign,
        q3Assign,
        q_show: 2,
        q1Index,
        q2Index,
        q3Index,
      });
    } else if (q2Assign.length !== 0) {
      this.setState({
        q1Score: q1Score,
        q2Score: q2Score,
        q1Assign,
        q2Assign,
        q_show: 1,
        q1Index,
        q2Index,
      });
    } else {
      this.setState({
        q1Score: q1Score,
        q1Assign,
        q_show: 0,
        q1Index,
      });
    }
    this.setState({ q1: q1Questions, q2: q2Questions, q3: q3Questions });
  };

  handleSaveAssignment = async () => {
    const {
      q1,
      q2,
      q3,
      q1Score,
      q2Score,
      q3Score,
      q1Assign,
      q2Assign,
      q3Assign,
      q1Index,
      q2Index,
      q3Index,
    } = this.state;
    // 1. Clean the student last progress and delete the old progress
    const doc1 = await axios.put("/api/print/student/progress", {
      newProgress: "",
    });
    if (doc1.data !== "") {
      await axios.delete("/api/print/student/progress/" + doc1.data);
    }

    // 2. save progress into database and save progress_id into student database
    const doc2 = await axios.post("/api/print/student/progress", {
      q1Score,
      q2Score,
      q3Score,
      q1Assign,
      q2Assign,
      q3Assign,
      q1Index,
      q2Index,
      q3Index,
      q1Questions: q1,
      q2Questions: q2,
      q3Questions: q3,
    });
    await axios.put("/api/print/student/progress", {
      newProgress: doc2.data._id,
    });
    // show alert bar
    this.setState({ alert: true });
  };

  handleSubmit = async (q3Score, q3Assign) => {
    const { q1Score, q2Score, q1Assign, q2Assign } = this.state;
    const newScore = q1Score + q2Score + q3Score;
    await axios.post("/api/print/assign", {
      newScore,
      q1Assign,
      q2Assign,
      q3Assign,
    });
    await axios.put("/api/print/score", { newScore });
    window.location = "/student/print";
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ alert: false });
  };

  renderQuestion = () => {
    const {
      q_show,
      q1,
      q2,
      q3,
      q1Assign,
      q2Assign,
      q3Assign,
      q1Index,
      q2Index,
      q3Index,
      q1Score,
      q2Score,
      q3Score,
    } = this.state;
    switch (q_show) {
      case 0:
        return (
          <Q1Table
            rows={q1}
            assignment={q1Assign}
            index={q1Index}
            score={q1Score}
            handleSaveAssignment={(index, questions, assign, score) => {
              this.setState(
                {
                  q1Index: index,
                  q1: questions,
                  q1Score: score,
                  q1Assign: assign,
                },
                this.handleSaveAssignment
              );
            }}
            handleNext={(q1Score, q1Assign) =>
              this.setState({ q1Score, q1Assign, q_show: q_show + 1 })
            }
          />
        );
      case 1:
        return (
          <Q2Table
            rows={q2}
            assignment={q2Assign}
            index={q2Index}
            score={q2Score}
            handleSaveAssignment={(index, questions, assign, score) => {
              this.setState(
                {
                  q2Index: index,
                  q2: questions,
                  q2Score: score,
                  q2Assign: assign,
                },
                this.handleSaveAssignment
              );
            }}
            handleNext={(q2Score, q2Assign) =>
              this.setState({ q2Score, q2Assign, q_show: q_show + 1 })
            }
          />
        );
      case 2:
        return (
          <Q3Table
            rows={q3}
            assignment={q3Assign}
            index={q3Index}
            score={q3Score}
            handleSaveAssignment={(index, questions, assign, score) => {
              this.setState(
                {
                  q3Index: index,
                  q3: questions,
                  q3Score: score,
                  q3Assign: assign,
                },
                this.handleSaveAssignment
              );
            }}
            handleNext={(q3Score, q3Assign) =>
              this.handleSubmit(q3Score, q3Assign)
            }
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { q1 } = this.state;
    return (
      <div>
        {q1.length !== 0 ? <div>{this.renderQuestion()}</div> : null}{" "}
        <Snackbar
          open={this.state.alert}
          autoHideDuration={2000}
          onClose={this.handleCloseAlert}
        >
          <Alert onClose={this.handleClose} severity="success">
            Saved Successfully!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default PrintTrainPart;
