import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green, red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonFail: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CircularIntegration(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname1 = clsx({
    [classes.buttonSuccess]: success,
  });

  const buttonClassname2 = clsx({
    [classes.buttonFail]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const checkAnswer = () => {
    props.handleClick();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 200);
    }
  };

  const nextQuestion = async () => {
    await props.next();
    setSuccess(false);
  };

  const summary = async () => {
    await props.update();
    await props.next();
    setSuccess(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="default"
          className={props.correct ? buttonClassname1 : buttonClassname2}
          onClick={checkAnswer}
          disabled={success}
        >
          {success ? (
            props.correct ? (
              <CheckIcon />
            ) : (
              <ClearIcon />
            )
          ) : (
            <div>Check</div>
          )}
        </Fab>
        {loading && (
          <CircularProgress size={68} className={classes.fabProgress} />
        )}
      </div>
      {props.answered ? (
        props.last ? (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={summary}
          >
            Done
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={nextQuestion}
          >
            Next
          </Button>
        )
      ) : null}
    </div>
  );
}
