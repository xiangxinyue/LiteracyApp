import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(300),
      height: theme.spacing(40),
    },
  },
  component: {
    margin: 10,
    padding: 10,
    textAlign: "center",
  },
}));

export default function SimplePaper(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div className={classes.component}>
          <props.component />
        </div>
      </Paper>
    </div>
  );
}
