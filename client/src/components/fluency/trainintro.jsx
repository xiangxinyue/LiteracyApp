import React from "react";
import Paper from "../../assets/paper";
import { Button, Container } from "@material-ui/core";

const Fluencytrainintro = (props) => {
  return (
    <Container>
      <h3>This is the introduction of fluency training. </h3>
      <p>
        In this lesson, you will see a non-word or made-up word on the screen. I
        want you to break down the word into different sounds that it is made
        of. You will do so by inserting space between different sounds. For
        example, there are 3 sounds in the word 'bint'. So, I will write "b i
        nt" as my response and press 'Enter' After you respond, you will get
        feedback on whether you answered correctly or not. If you are wrong, the
        program will tell you the right answer.
      </p>
      <iframe
        width="740"
        height="430"
        src="https://www.youtube.com/embed/rDg4S6jxLJI"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <hr />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={props.handleClick}
      >
        Understand
      </Button>
    </Container>
  );
};

export default Fluencytrainintro;
