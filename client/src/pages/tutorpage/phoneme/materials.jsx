import React from "react";
import axios from "axios";
import { Button, Container, TextField } from "@material-ui/core";
import keys from "../../../assets/keys";

class PhonemeTutorMaterials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paragraphs: [],
      videos: [],
      currPara: "",
      id: "",
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/phoneme/materials");
    if (doc.data) {
      this.setState({
        paragraphs: doc.data.paragraphs,
        videos: doc.data.videos,
        id: doc.data._id,
      });
    }
  };

  handleParagraphAdd = async () => {
    const { paragraphs, currPara } = this.state;
    paragraphs.push(currPara);
    await axios.put("/api/phoneme/materials/" + this.state.id, { paragraphs });
    this.setState({ currPara: "" });
    this.componentDidMount();
  };

  handleParagraphDelete = async (index) => {
    const { paragraphs } = this.state;
    const newParagraphs = paragraphs
      .slice(0, index)
      .concat(paragraphs.slice(index + 1, paragraphs.length));
    await axios.put("/api/phoneme/materials/" + this.state.id, {
      paragraphs: newParagraphs,
    });
    this.componentDidMount();
  };

  handleVideoAdd = async (file) => {
    if (!!file) {
      const doc = await axios.get("/api/phoneme/video");
      const uploadConfigs = doc.data;
      await axios
        .put(uploadConfigs.url, file, {
          headers: {
            "Content-type": file.type,
          },
        })
        .catch((err) => console.log(err));
      const { videos, id } = this.state;
      videos.push(uploadConfigs.key);
      await axios.put("/api/phoneme/materials/" + id, { videos });
      this.componentDidMount();
    }
  };

  handleVideoDelete = async (index) => {
    const { videos } = this.state;
    const newVideos = videos
      .slice(0, index)
      .concat(videos.slice(index + 1, videos.length));
    await axios.put("/api/phoneme/materials/" + this.state.id, {
      videos: newVideos,
    });
    this.componentDidMount();
  };

  render() {
    console.log(this.state);
    const { paragraphs, videos } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Modify Learning Materials</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/phoneme">
            Go back
          </Button>
        </div>
        <Container>
          <TextField
            style={{ width: "50%", marginRight: 10 }}
            multiline={true}
            onChange={(e) => this.setState({ currPara: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleParagraphAdd}
          >
            Add
          </Button>
          <br />
          <br />
          {paragraphs.map((paragraph, index) => {
            return (
              <div className="row">
                <h5>{paragraph}</h5>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ marginLeft: 10 }}
                  onClick={() => this.handleParagraphDelete(index)}
                >
                  Delete
                </Button>
              </div>
            );
          })}
          <hr />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => this.handleVideoAdd(e.target.files[0])}
          />
          <br />
          <br />
          {videos.map((video, index) => {
            return (
              <div className="row">
                <h5>{keys.AWS + video}</h5>
                <Button
                  variant="outlined"
                  color="secondary"
                  v
                  onClick={() => this.handleVideoDelete(index)}
                >
                  Delete
                </Button>
              </div>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorMaterials;
