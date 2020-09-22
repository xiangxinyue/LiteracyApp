import React from "react";
import {
  TextField,
  Button,
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
      appearTimes: {},
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
    const {
      curr_answer,
      index,
      questions,
      assign,
      score,
      appearTimes,
    } = this.state;
    if (!appearTimes[questions[index].question]) {
      appearTimes[questions[index].question] = 1;
    } else {
      appearTimes[questions[index].question] += 1;
    }
    this.setState({ appearTimes });
    let addScore = 0;
    for (const key in curr_answer) {
      if (questions[index].answer.includes(curr_answer[key])) addScore += 1;
    }
    if (addScore < 4 && appearTimes[questions[index].question] < 3) {
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
      curr_answer: { 0: "", 1: "", 2: "", 3: "" },
    });
  };

  render() {
    const {
      questions,
      index,
      assign,
      score,
      curr_answer,
      appearTimes,
    } = this.state;
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
              <div className="row">
                {questions[index].answer.map((answer, num) => (
                  <TextField
                    value={curr_answer[num] ? curr_answer[num] : ""}
                    label={"Answer " + Number(num + 1)}
                    autoComplete="off"
                    style={{ marginLeft: 10 }}
                    onChange={(e) => this.handleChange(num, e.target.value)}
                  />
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: 10, marginTop: 5 }}
                  onClick={this.handleNext}
                >
                  Next
                </Button>
              </div>
              <br />
              {appearTimes[questions[index].question] === 2 ? (
                <div>
                  (Hint: {questions[index].answer.map((answer) => answer + "/")}
                  )
                </div>
              ) : null}
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
        </Container>
      </div>
    );
  }
}
