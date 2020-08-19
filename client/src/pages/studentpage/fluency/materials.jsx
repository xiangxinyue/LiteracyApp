import FluencyHeader from "../../../components/student/fluency/assets/header";
import React from "react";
import { Button, Container } from "@material-ui/core";
import P1 from "../../../assets/fonts/p1";
import P2 from "../../../assets/fonts/p2";
import P3 from "../../../assets/fonts/p3";

const FluencyMaterials = () => {
  return (
    <div>
      <FluencyHeader part="Training Materials" />

      <Container>
        <P1 className="text-primary">
          Please watch the introduction video before your training.
        </P1>
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
