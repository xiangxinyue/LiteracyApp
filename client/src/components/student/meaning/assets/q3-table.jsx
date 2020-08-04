import React from "react";
import { TextField, Button } from "@material-ui/core";

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
    this.setState((state) => {
      const curr_answer = state.curr_answer;
      curr_answer[num] = value;
      return { ...state, curr_answer };
    });
  };

  handleNext = () => {
    const { curr_answer, index, questions, assign, score } = this.state;
    let addScore = 0;
    for (const key in curr_answer) {
      if (questions[index].answer.includes(curr_answer[key])) addScore += 1;
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
      curr_answer: { 0: "" },
    });
  };

  render() {
    const { questions, index, assign, score, curr_answer } = this.state;
    return (
      <div>
        {index !== questions.length ? (
          <div>
            <h3 className="font-weight-light">{questions[index].question}</h3>
            <div className="row">
              {[0].map((num) => (
                <TextField
                  autoComplete="off"
                  value={curr_answer[num]}
                  label={"Answer " + Number(num + 1)}
                  onChange={(e) => this.handleChange(num, e.target.value)}
                />
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNext}
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.handleNext(score, assign)}
          >
            Finish
          </Button>
        )}
      </div>
    );
  }
}
