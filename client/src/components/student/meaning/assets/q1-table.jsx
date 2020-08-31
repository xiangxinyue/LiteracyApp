import React from "react";
import { TextField, Button, LinearProgress } from "@material-ui/core";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.rows,
      index: 0,
      curr_answer: {},
      assign: [],
      score: 0,
    };
  }

  handleChange = (num, value) => {
    this.setState(
      (state) => {
        const curr_answer = state.curr_answer;
        curr_answer[num] = value;
        return { ...state, curr_answer };
      },
      () => console.log(this.state)
    );
  };

  handleNext = () => {
    const { curr_answer, index, questions, assign, score } = this.state;
    let addScore = 0;
    for (const key in curr_answer) {
      if (questions[index].answer.includes(curr_answer[key])) addScore += 1;
    }
    if (addScore === 0) {
      questions.push(questions[index]);
      this.setState({ questions });
    }
    assign.push({
      level: questions[index].level,
      question: questions[index].question,
      realAnswer: questions[index].answer,
      studentAnswer: curr_answer,
    });
    this.setState({
      score: score + addScore,
      index: index + 1,
      assign,
      curr_answer: {},
    });
  };

  render() {
    const { questions, index, assign, score, curr_answer } = this.state;
    const progress = Math.floor((index / questions.length) * 100);
    return (
      <div>
        {index !== questions.length ? (
          <div>
            <P2 className="font-weight-light">{questions[index].question}</P2>
            <div className="row">
              {questions[index].answer.map((_, index) => (
                <TextField
                  autoComplete="off"
                  value={curr_answer[index] ? curr_answer[index] : ""}
                  label={"Answer " + Number(index + 1)}
                  style={{ marginLeft: 20 }}
                  onChange={(e) => this.handleChange(index, e.target.value)}
                />
              ))}
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: 20 }}
                onClick={this.handleNext}
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.handleNext(score, assign)}
            >
              Go Section 2
            </Button>
            <br />
          </div>
        )}
        <br />
        <LinearProgress variant="determinate" value={progress} />
      </div>
    );
  }
}
