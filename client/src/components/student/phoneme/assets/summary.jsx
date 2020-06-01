import React from "react";
import Paper from "../../../../assets/paper";
import { Button, List } from "@material-ui/core";

const phonemesummary = (props) => {
  const Summary = () => {
    return (
      <div>
        <h3>Summary of Phoneme Training</h3>
        <p>You have finished {props.number} questions in this training</p>
        <p>Your accuracy now is {props.accuracy}%</p>
        <p>Please review those wrong phoneme</p>
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
