import React from "react";
import { Button, Container } from "@material-ui/core";

const PrintTestIntro = (props) => {
  return (
    <Container>
      <h4>
        Now, you will get to practice your knowledge about letter patterns by
        completing exercises. There are different types of exercises, like fill
        in the blanks, multiple choice questions. Please read carefully and
        answer as best as you can.
      </h4>

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

export default PrintTestIntro;
