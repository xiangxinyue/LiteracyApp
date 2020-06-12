import React from "react";
import Paper from "../../../../assets/paper";
import { Button, List } from "@material-ui/core";

const phonemesummary = (props) => {
  const Summary = () => {
    return (
      <div>
        <h3>Summary of Sound Training</h3>
        <h5>You have finished {props.number} questions in this training</h5>
        <h5>Your accuracy now is {props.accuracy}%</h5>
        <h5>Go over these made-up words</h5>
        <List>
          {props.wrongPhoneme.map((e, index) => {
            return (
              <li key={index}>
                {props.wrongWord[index]} => {e}
                <br />
              </li>
            );
          })}
        </List>
        <hr />
        <Button variant="contained" color="primary" href="/student/phoneme">
          Good Job!
        </Button>
      </div>
    );
  };
  return (
    <div>
      <Paper component={Summary} />
    </div>
  );
};

export default phonemesummary;
