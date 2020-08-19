import React from "react";
import { Button, Container } from "@material-ui/core";

export default (props) => {
  return (
    <Container>
      <h4 className="text-primary">
        Now, you will get to practice your knowledge about sound patterns by
        completing exercises. There are different types of exercises, like fill
        in the blanks, multiple choice questions. Please read carefully and
        answer as best as you can.
      </h4>
      <hr />
      <div className="row">
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ marginLeft: 10, marginRight: 10 }}
          onClick={props.handleClick}
        >
          Start
        </Button>
        <Button
          variant="contained"
          color="inherit"
          size="large"
          onClick={() => (window.location = "/student/phoneme")}
        >
          Go Back
        </Button>
      </div>
    </Container>
  );
};
