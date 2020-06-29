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

  handleNext = () => {
    const { curr_answer, index, questions, assign, score } = this.state;
    let addScore = 0;
    if (questions[index].answer === curr_answer) addScore += 1;
    assign.push({
      level: questions[index].level,
      question: questions[index].question,
      choices: questions[index].choices,
      realAnswer: questions[index].answer,
      studentAnswer: curr_answer,
    });
    this.setState({
      score: score + addScore,
      index: index + 1,
      assign,
      curr_answer: "",
    });
  };

  render() {
    const { questions, index, assign, score } = this.state;
    return (
      <div>
        {index !== questions.length ? (
          <div>
            <h3 className="font-weight-light">{questions[index].question}</h3>
            <RadioGroup
              onChange={(e) => this.setState({ curr_answer: e.target.value })}
            >
              <div className="row">
                {questions[index].choices.map((choice) => (
                  <FormControlLabel
                    value={choice}
                    control={<Radio />}
                    label={choice}
                  />
                ))}
              </div>
            </RadioGroup>
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
            Go Section 3
          </Button>
        )}
      </div>
    );
  }
}
