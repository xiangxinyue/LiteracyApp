import React from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import Q1Table from "../assets/q1-table";
import Q2Table from "../assets/q2-table";
import Q3Table from "../assets/q3-table";

class PrintTrainPart extends React.Component {
  constructor() {
    super();
    this.state = {
      q1_student_answer: [],
      q2_student_answer: [],
      q3_student_answer: [],
      q1_curr_answer: {},
      q2_curr_answer: "",
      q3_curr_answer: {},
      q_show: 0,
      q1: [],
      q2: [],
      q3: [],
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/print/traindata");
    this.setState({ q1: doc.data.q1, q2: doc.data.q2, q3: doc.data.q3 });
  };

  handleQ1Change = (num, value) => {
    this.setState((state) => {
      const q1_curr_answer = state.q1_curr_answer;
      q1_curr_answer[num] = value;
      return { q1_curr_answer, ...state };
    });
  };

  handleQ3Change = (value, index) => {
    const { q3_curr_answer } = this.state;
    q3_curr_answer[index] = value;
    this.setState({ q3_curr_answer });
  };

  handleNext = () => {
    const {
      q_show,
      q1_student_answer,
      q2_student_answer,
      q1_curr_answer,
      q2_curr_answer,
    } = this.state;
    if (q_show == 0) {
      q1_student_answer.push(q1_curr_answer);
      this.setState({ q1_student_answer, q1_curr_answer: {} });
    } else {
      q2_student_answer.push(q2_curr_answer);
      this.setState({ q2_student_answer, q2_curr_answer: "" });
    }
    this.setState({ q_show: q_show + 1 });
  };

  handleSubmit = async () => {
    // update the q3_student_answer
    const {
      q1_student_answer,
      q2_student_answer,
      q3_student_answer,
      q3_curr_answer,
      q1,
      q2,
      q3,
    } = this.state;
    q3_student_answer.push(q3_curr_answer);
    this.setState({ q3_student_answer, q3_curr_answer: {} });
    // mark q1
    let q1_score = 0;
    for (let i = 0; i < q1.length; i++) {
      for (const key in q1_student_answer[i]) {
        if (q1[i].answer.includes(q1_student_answer[i][key])) q1_score += 1;
      }
    }
    // mark q2
    let q2_score = 0;
    for (let i = 0; i < q2.length; i++) {
      if (q2[i].answer === q2_student_answer[i]) q2_score += 1;
    }
    // mark q3
    let q3_score = 0;
    for (let i = 0; i < q3.length; i++) {
      for (const key in q3_student_answer[i]) {
        if (q3[i].choices[key].answer === q3_student_answer[i][key]) {
          q3_score += 1;
        }
      }
    }
    console.log(q1_score);
    console.log(q2_score);
    console.log(q3_score);
    const score = q1_score + q2_score + q3_score;
    await axios.post("/api/print/score", { score });
    window.location = "/student/print";
  };

  renderQuestion = () => {
    const { q_show, q1, q2, q3 } = this.state;
    switch (q_show) {
      case 0:
        return <Q1Table handleQ1Change={this.handleQ1Change} rows={q1} />;
      case 1:
        return (
          <Q2Table
            handleQ2Change={(value) => this.setState({ q2_curr_answer: value })}
            rows={q2}
          />
        );
      case 2:
        return <Q3Table handleQ3Change={this.handleQ3Change} rows={q3} />;
      default:
        return null;
    }
  };

  render() {
    const { q_show } = this.state;
    return (
      <div>
        {this.renderQuestion()}
        <br />
        <br />
        {q_show == 2 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={this.handleNext}>
            Next
          </Button>
        )}
      </div>
    );
  }
}

export default PrintTrainPart;
