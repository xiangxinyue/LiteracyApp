import React from "react";
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
} from "@material-ui/core";
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
    const progress = Math.floor((index / questions.length) * 100);
    return (
      <div>
        {index !== questions.length ? (
          <div>
            <P1 className="font-weight-light">{questions[index].question}</P1>
            <RadioGroup
              onChange={(e) => this.setState({ curr_answer: e.target.value })}
            >
              <div className="row">
                {questions[index].choices.map((choice) => (
                  <FormControlLabel
                    value={choice}
                    control={<Radio />}
                    label={choice}
                    style={{ marginLeft: 10 }}
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
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.handleNext(score, assign)}
            >
              Go Section 3
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
