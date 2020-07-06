import PhonemeHeader from "../../../components/student/phoneme/assets/header";
import React from "react";
import { Button, Container } from "@material-ui/core";

const MeaningMaterials = (props) => {
  return (
    <div>
      <PhonemeHeader part="Training Materials Page" />

      <Container>
        <h3 className="text-primary">
          This is the learning materials of Meaning Training.
        </h3>
        <h4>
          Meaning Instructions: Watch the introduction video first, then click the start
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
          onClick={() => (window.location = "/student/meaning")}
        >
          Go Back
        </Button>
      </Container>
    </div>
  );
};

export default MeaningMaterials;
