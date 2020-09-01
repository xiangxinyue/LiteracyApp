import React from "react";
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Container,
} from "@material-ui/core";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.rows,
      index: this.props.index ? this.props.index : 0,
      curr_answer: {},
      assign: this.props.assignment ? this.props.assignment : [],
      score: this.props.score ? this.props.score : 0,
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
    if (addScore === 0) {
      questions.push(questions[index]);
      this.setState({ questions });
    }
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
    const progress = Math.floor((index / questions.length) * 100);
    return (
      <div>
        <Container style={{ marginTop: "5%" }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: 20 }}
            onClick={() =>
              this.props.handleSaveAssignment(index, questions, assign, score)
            }
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => (window.location = "/student/print")}
          >
            Quit
          </Button>
        </Container>
        <Container style={{ marginTop: "10%" }}>
          {index !== questions.length ? (
            <div>
              <P1 className="font-weight-light">{questions[index].question}</P1>
              {questions[index].choices.map((choice, i) => (
                <RadioGroup
                  onChange={(e) => this.handleChange(i, e.target.value)}
                >
                  <div className="row">
                    <FormControlLabel
                      value={choice.choice1}
                      control={<Radio />}
                      label={choice.choice1}
                      style={{ marginLeft: 10 }}
                    />
                    <FormControlLabel
                      value={choice.choice2}
                      control={<Radio />}
                      label={choice.choice2}
                      style={{ marginLeft: 10 }}
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
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.props.handleNext(score, assign)}
              >
                Finish
              </Button>
              <br />
            </div>
          )}
          <br />
          <LinearProgress variant="determinate" value={progress} />
        </Container>
      </div>
    );
  }
}
