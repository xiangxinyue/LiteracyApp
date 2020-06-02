import React from "react";
import { Button, Container } from "@material-ui/core";

const MeaningTestIntro = (props) => {
  return (
    <Container>
      <h3 className="text-primary">
        This is the introduction of Meaning Testing.
      </h3>
      <h4>
        Instructions: Watch the introduction video first, then click the start
        button to begin the meaning testing part. 
        This is the knowledge or awareness of morphemes (smallest
        meaningful unit). For example, there are 2 morphemes in the word: beautiful (beauty+ful)
      </h4>
      <iframe
        width="740"
        height="430"
        src="https://www.youtube.com/embed/o4HXapRlr1A"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style={{ marginTop: 20 }}
      ></iframe>
      <hr />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => props.handleClick()}
      >
        Start
      </Button>
      <Button
        variant="contained"
        color="inherit"
        size="large"
        onClick={() => (window.location = "/")}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default MeaningTestIntro;
