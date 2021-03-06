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

class MeaningTrainPart extends React.Component {
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
      q3Score: 0,
      q1Assign: [],
      q2Assign: [],
      q3Assign: [],
      q_show: 0,
      alert: false,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/meaning/student/assign");
    const { q1, q2, q3 } = this.generateAssign(doc.data);
    const number = 20;
    await this.setState({
      q1: q1.slice(0, number),
      q2: q2.slice(0, number),
      q3: q3.slice(0, number),
    });
    console.log(this.state);
  };

  generateAssign = (data) => {
    let q1 = data.q1;
    let q2 = data.q2;
    let q3 = data.q3;
    console.log(q1, q2, q3);
    while (q1.length < 20) {
      q1 = q1.concat(q1);
    }
    while (q2.length < 20) {
      q2 = q2.concat(q2);
    }
    while (q3.length < 20) {
      q3 = q3.concat(q3);
    }
    return { q1, q2, q3 };
  };

  handleSaveAssignment = async () => {
    console.log("handle save is called once");
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
    const doc1 = await axios.put("/api/meaning/student/progress", {
      newProgress: "",
    });
    if (doc1.data !== "") {
      await axios.delete("/api/meaning/student/progress/" + doc1.data);
    }

    // 2. save progress into database and save progress_id into student database
    const doc2 = await axios.post("/api/meaning/student/progress", {
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
    await axios.put("/api/meaning/student/progress", {
      newProgress: doc2.data._id,
    });
    // show alert bar
    this.setState({ alert: true });
  };

  handleSubmit = async (q3_score, q3Assign) => {
    const { q1_score, q2_score, q1Assign, q2Assign } = this.state;
    const newScore = q1_score + q2_score + q3_score;
    console.log(q1_score, q2_score, q3_score, q1Assign, q2Assign, q3Assign);
    await axios.post("/api/meaning/assign", {
      newScore,
      q1Assign,
      q2Assign,
      q3Assign,
    });
    await axios.put("/api/meaning/score", { newScore });
    window.location = "/student/meaning";
  };
  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ alert: false });
  };

  renderQuestion = () => {
    const { q_show, q1, q2, q3 } = this.state;
    switch (q_show) {
      case 0:
        return (
          <Q1Table
            rows={q1}
            handleSaveAssignment={(index, questions, assign, score) => {
              console.log(assign, score);
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
        {q1.length !== 0 ? this.renderQuestion() : null}
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

export default MeaningTrainPart;
