import React from "react";
import { Button, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

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
    questions[index].choices.map((choice, i) => {
      if (choice.answer === curr_answer[i]) addScore += 1;
    });
    assign.push({
      level: questions[index].level,
      question: questions[index].question,
      choices: questions[index].choices,
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
    const { questions, index, assign, score } = this.state;
    return (
      <div>
        {index !== questions.length ? (
          <div>
            <h3 className="font-weight-light">{questions[index].question}</h3>
            {questions[index].choices.map((choice, i) => (
              <RadioGroup
                onChange={(e) => this.handleChange(i, e.target.value)}
              >
                <div className="row">
                  <FormControlLabel
                    value={choice.choice1}
                    control={<Radio />}
                    label={choice.choice1}
                  />
                  <FormControlLabel
                    value={choice.choice2}
                    control={<Radio />}
                    label={choice.choice2}
                  />
                </div>
              </RadioGroup>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
            >
              Next
            </Button>
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
