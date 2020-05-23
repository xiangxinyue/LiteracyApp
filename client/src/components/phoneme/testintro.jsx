import React from "react";
import Paper from "../../assets/paper";
import Button from "@material-ui/core/Button";

const phonemetestintro = (props) => {
  const intro = () => {
    return (
      <div>
        <h3>This is the introduction of phoneme testing. </h3>
        <p>
          Attention: this is your first time to use phoneme train, we will
          evaluate your current level by this testing.
        </p>
        <p>
          In this lesson, you will see a non-word or made-up word on the screen.
          I want you to break down the word into different sounds that it is
          made of. You will do so by inserting space between different sounds.
          For example, there are 3 sounds in the word 'bint'. So, I will write
          "b i nt" as my response and press 'Enter' After you respond, you will
          get feedback on whether you answered correctly or not. If you are
          wrong, the program will tell you the right answer.
        </p>
        <Button variant="contained" color="primary" onClick={props.handleClick}>
          Understand
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

export default phonemetestintro;
