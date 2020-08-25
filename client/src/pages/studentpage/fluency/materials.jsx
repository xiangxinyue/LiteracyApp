import FluencyHeader from "../../../components/student/fluency/assets/header";
import React from "react";
import { Button, Container } from "@material-ui/core";
import P1 from "../../../assets/fonts/p1";
import P2 from "../../../assets/fonts/p2";
import P3 from "../../../assets/fonts/p3";
import axios from "axios";
import keys from "../../../assets/keys";

class FluencyMaterials extends React.Component {
  constructor() {
    super();
    this.state = {
      paragraphs: [],
      videos: [],
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/fluency/materials");
    if (doc.data) {
      this.setState({
        paragraphs: doc.data.paragraphs,
        videos: doc.data.videos,
      });
    }
  };

  render() {
    const { paragraphs, videos } = this.state;
    return (
      <div>
        <FluencyHeader part="Learning Materials" />
        <Container>
          {paragraphs.map((paragraph) => {
            return (
              <div>
                <P2>{paragraph}</P2>
              </div>
            );
          })}
          <hr />
          {videos.map((video) => {
            return (
              <div>
                <iframe width="40%" src={keys.AWS + video}></iframe>
              </div>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default FluencyMaterials;
