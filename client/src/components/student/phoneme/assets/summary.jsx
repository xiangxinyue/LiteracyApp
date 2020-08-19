import React from "react";
import Paper from "../../../../assets/paper";
import { Button, List } from "@material-ui/core";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";

const phonemesummary = (props) => {
  const Summary = () => {
    return (
      <div>
        <P1>Summary of Sound Training</P1>
        <P2>You have finished {props.number} questions in this training</P2>
        <P2>Your accuracy now is {props.accuracy}%</P2>
        <P2>Go over these made-up words</P2>
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
