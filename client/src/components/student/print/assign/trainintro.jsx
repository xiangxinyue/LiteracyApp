import React from "react";
import { Button, Container } from "@material-ui/core";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";

const PrintTestIntro = (props) => {
  return (
    <Container>
      <P2>
        Now, you will get to practice your knowledge about letter patterns by
        completing exercises. There are different types of exercises, like fill
        in the blanks and multiple choice questions. Please read carefully and
        answer as best as you can.
      </P2>

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
