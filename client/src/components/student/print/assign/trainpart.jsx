import React from "react";
import axios from "axios";
import Q1Table from "../assets/q1-table";
import Q2Table from "../assets/q2-table";
import Q3Table from "../assets/q3-table";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";
import { LinearProgress } from "@material-ui/core";

class PrintTrainPart extends React.Component {
  constructor() {
    super();
    this.state = {
      q1: [],
      q2: [],
      q3: [],
      q1_score: 0,
      q2_score: 0,
      q1Assign: [],
      q2Assign: [],
      q_show: 0,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/print/student/assign");
    const { q1, q2, q3 } = this.generateAssign(doc.data);
    await this.setState({
      q1: q1.slice(0, 5),
      q2: q2.slice(0, 5),
      q3: q3.slice(0, 5),
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

  handleSubmit = async (q3_score, q3Assign) => {
    const { q1_score, q2_score, q1Assign, q2Assign } = this.state;
    const newScore = q1_score + q2_score + q3_score;
    console.log(q1_score, q2_score, q3_score, q1Assign, q2Assign, q3Assign);
    await axios.post("/api/print/assign", {
      newScore,
      q1Assign,
      q2Assign,
      q3Assign,
    });
    await axios.put("/api/print/score", { newScore });
    window.location = "/student/print";
  };

  renderQuestion = () => {
    const { q_show, q1, q2, q3 } = this.state;
    switch (q_show) {
      case 0:
        return (
          <Q1Table
            rows={q1}
            handleNext={(q1_score, q1Assign) =>
              this.setState({ q1_score, q1Assign, q_show: q_show + 1 })
            }
          />
        );
      case 1:
        return (
          <Q2Table
            rows={q2}
            handleNext={(q2_score, q2Assign) =>
              this.setState({ q2_score, q2Assign, q_show: q_show + 1 })
            }
          />
        );
      case 2:
        return (
          <Q3Table
            rows={q3}
            handleNext={(q3_score, q3Assign) =>
              this.handleSubmit(q3_score, q3Assign)
            }
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { q1 } = this.state;
    return q1.length !== 0 ? <div>{this.renderQuestion()}</div> : null;
  }
}

export default PrintTrainPart;
