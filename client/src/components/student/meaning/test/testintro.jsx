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
        button.
      </h4>
      <iframe
        width="740"
        height="430"
        src="https://www.youtube.com/embed/rDg4S6jxLJI"
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
        style={{ marginRight: 10 }}
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
