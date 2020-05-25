import FluencyHeader from "../../components/fluency/header";
import React from "react";
import Paper from "../../assets/paper";
import { Button, Container } from "@material-ui/core";

const FluencyMaterials = (props) => {
  return (
    <div>
      <FluencyHeader />

      <Container>
        <h3 className="text-primary">
          This is the learning materials of Speed Training.
        </h3>
        <h4>
          Instructions: Watch the introduction video first, then click the start
          button. Read the words as fast as possible. When you finish click the
          finish button.
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
          color="inherit"
          size="large"
          onClick={() => (window.location = "/student/fluency")}
        >
          Go Back
        </Button>
      </Container>
    </div>
  );
};

export default FluencyMaterials;
