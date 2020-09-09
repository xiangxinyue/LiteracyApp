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

  handleChange = (value) => {
    this.setState({ curr_answer: value });
  };

  handleNext = () => {
    const { curr_answer, index, questions, assign, score } = this.state;
    let addScore = 0;
    if (questions[index].answer === curr_answer) addScore += 1;
    if (addScore === 0) {
      questions.push(questions[index]);
      this.setState({ questions });
    }
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
    const { questions, index, assign, score, curr_answer } = this.state;
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
            onClick={() => (window.location = "/student/meaning")}
          >
            Quit
          </Button>
        </Container>
        <Container style={{ marginTop: "10%" }}>
          {index !== questions.length ? (
            <div>
              <P2 className="font-weight-light">{questions[index].question}</P2>
              <RadioGroup onChange={(e) => this.handleChange(e.target.value)}>
                <div className="row">
                  <FormControlLabel
                    value={questions[index].choices[0]}
                    control={
                      <Radio
                        checked={curr_answer === questions[index].choices[0]}
                      />
                    }
                    label={questions[index].choices[0]}
                    style={{ marginLeft: 10 }}
                  />
                  <FormControlLabel
                    value={questions[index].choices[1]}
                    control={
                      <Radio
                        checked={curr_answer === questions[index].choices[1]}
                      />
                    }
                    label={questions[index].choices[1]}
                    style={{ marginLeft: 10 }}
                  />
                  <FormControlLabel
                    value={questions[index].choices[2]}
                    control={
                      <Radio
                        checked={curr_answer === questions[index].choices[2]}
                      />
                    }
                    label={questions[index].choices[2]}
                    style={{ marginLeft: 10 }}
                  />
                  <FormControlLabel
                    value={questions[index].choices[3]}
                    control={
                      <Radio
                        checked={curr_answer === questions[index].choices[3]}
                      />
                    }
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
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.props.handleNext(score, assign)}
              >
                Submit
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
