import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [" ", " ", " "];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <h4>
          Attention: This is your first time to use sound train. So, we will
          find your current level of skill.
        </h4>
      );
    case 1:
      return (
        <h4>
          In this lesson, you will see a made-up word on the screen. You will
          break down the word into different sounds that it is made of. You will
          do so by inserting space between different sounds.
        </h4>
      );
    case 2:
      return (
        <h4>
          For example, there are 3 sounds in the made-up word 'bint'. So, you
          will write "b i nt" as my response and press 'Enter' After you
          respond, you will get feedback on whether you answered correctly or
          not.
        </h4>
      );
    default:
      return "Unknown step";
  }
}

export default function VerticalLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleClick}
          >
            Start
          </Button>
        </Paper>
      )}
    </div>
  );
}
