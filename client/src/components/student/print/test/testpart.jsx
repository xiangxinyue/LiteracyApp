import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@material-ui/core";
import Choices from "../assets/q3-choices";

class PrintTestPart extends React.Component {
  constructor() {
    super();
    this.state = {
      q3_choices: [
        { value1: "vadd", value2: "vaad" },
        { value1: "dau", value2: "daw" },
        { value1: "filv", value2: "filk" },
        { value1: "moke", value2: "moje" },
        { value1: "dake", value2: "dayk" },
        { value1: "fage", value2: "fajy" },
      ],
      q1_answer: "",
      q2_answer: "",
      q3_answer: {},
    };
  }

  componentDidMount = () => {};

  handleQ3Change = (value, index) => {
    const { q3_answer } = this.state;
    q3_answer[index] = value;
    this.setState({ q3_answer }, () => console.log(this.state.q3_answer));
  };

  handleSubmit = async () => {
    console.log("submit the print test");
  };

  render() {
    const { q3_choices } = this.state;
    return (
      <div>
        <h3 className="font-weight-light">
          Question 1: List at least 4 ways that the sound /k/ can be spelled?
        </h3>
        <TextField
          style={{ width: 300 }}
          onChange={(e) => this.setState({ q1_answer: e.target.value })}
        />
        <h3 className="font-weight-light">
          Question 2: From the list of options below, choose all the correct
          ways that the sound /f/ can be spelled?
        </h3>
        <RadioGroup
          onChange={(e) => this.setState({ q2_answer: e.target.value })}
        >
          <div className="row">
            <FormControlLabel value="/ff/" control={<Radio />} label="/ff/" />
            <FormControlLabel value="/fg/" control={<Radio />} label="/fg/" />
            <FormControlLabel value="/gh/" control={<Radio />} label="/gh/" />
            <FormControlLabel value="/lf/" control={<Radio />} label="/lf/" />
            <FormControlLabel value="/ft/" control={<Radio />} label="/ft/" />
          </div>
        </RadioGroup>
        <h3 className="font-weight-light">
          Question 3: Out of word pairs below, select the one word that looks
          most like it could be a real word in English. For example, out of
          beff-ffeb, the correct answer is beff as the ff letter pattern is
          always present at the end of a word.
        </h3>
        {q3_choices.map((choice, index) => (
          <Choices
            key={index}
            value1={choice.value1}
            value2={choice.value2}
            handleChange={(value) => this.handleQ3Change(value, index)}
          />
        ))}
        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
          Submit
        </Button>
      </div>
    );
  }
}

export default PrintTestPart;
