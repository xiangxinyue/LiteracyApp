import PhonemeHeader from "../../../components/student/phoneme/assets/header";
import React from "react";
import { Button, Container } from "@material-ui/core";

const PhonemeMaterials = () => {
  return (
    <div>
      <PhonemeHeader part="Training Materials" />

      <Container>
        <h3 className="text-primary">
          Please watch the introduction video before your training.
        </h3>
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
          onClick={() => (window.location = "/student/phoneme")}
        >
          Go Back
        </Button>
      </Container>
    </div>
  );
};

export default PhonemeMaterials;
