import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularIntegration from "../answerbutton";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 375,
    margin: 10,
    textAlign: "center",
  },
});

export default function WordCard(props) {
  const classes = useStyles();
  const array = props.phoneme.split(" ");
  const phonemeWord = array.join("•");

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {props.answered ? (
          <Typography variant="h3" component="h2">
            {phonemeWord}
          </Typography>
        ) : (
          <Typography variant="h3" component="h2">
            {props.word}
          </Typography>
        )}
      </CardContent>
      <Grid container spacing={0}>
        <Grid item xs={7}>
          <TextField
            id="outlined-basic"
            label="Phoneme"
            variant="outlined"
            value={props.input}
            onChange={(e) => props.handleInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={5}>
          <CircularIntegration
            next={props.next}
            handleClick={props.handleClick}
            answered={props.answered}
            correct={props.correct}
            last={props.last}
            update={props.update}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
