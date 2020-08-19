import React from "react";
import { Button, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.rows,
      index: 0,
      curr_answer: "",
      assign: [],
      score: 0,
    };
  }

  handleChange = (value) => {
    this.setState({ curr_answer: value });
  };

  handleNext = () => {
    const { curr_answer, index, questions, assign, score } = this.state;
    let addScore = 0;
    if (questions[index].answer === curr_answer) addScore += 1;
    assign.push({
      level: questions[index].level,
      question: questions[index].question,
      choices: questions[index].choices,
      answer: questions[index].answer,
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
            <P2 className="font-weight-light">{questions[index].question}</P2>
            <RadioGroup onChange={(e) => this.handleChange(e.target.value)}>
              <div className="row">
                <FormControlLabel
                  value={questions[index].choices[0]}
                  control={<Radio />}
                  label={questions[index].choices[0]}
                  style={{ marginLeft: 10 }}
                />
                <FormControlLabel
                  value={questions[index].choices[1]}
                  control={<Radio />}
                  label={questions[index].choices[1]}
                  style={{ marginLeft: 10 }}
                />
                <FormControlLabel
                  value={questions[index].choices[2]}
                  control={<Radio />}
                  label={questions[index].choices[2]}
                  style={{ marginLeft: 10 }}
                />
                <FormControlLabel
                  value={questions[index].choices[3]}
                  control={<Radio />}
                  label={questions[index].choices[3]}
                  style={{ marginLeft: 10 }}
                />
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
            Submit
          </Button>
        )}
      </div>
    );
  }
}
