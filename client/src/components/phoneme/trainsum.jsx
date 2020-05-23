import React from "react";
import Paper from "../../assets/paper";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const phonemesummary = (props) => {
  const intro = () => {
    return (
      <div>
        <h3>Summary of Phoneme Training</h3>
        <p>You have finished {props.number} questions in this training</p>
        <p>Your accuracy now is {props.accuracy}%</p>
        <p>Please review those wrong phoneme</p>
        {props.wrongPhoneme.map((e, index) => {
          return (
            <Card color="textSecondary" key={index}>
              {props.wrongWord[index]} => {e}
              <br />
            </Card>
          );
        })}
        <Button variant="contained" color="primary" href="/phonemetrain">
          Good Job!
        </Button>
      </div>
    );
  };
  return (
    <div>
      <Paper component={intro} />
    </div>
  );
};

export default phonemesummary;
