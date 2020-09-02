import React from "react";
import axios from "axios";
import { Button, Container, TextField } from "@material-ui/core";
import keys from "../../../assets/keys";

class FluencyTutorMaterials extends React.Component {
  constructor() {
    super();
    this.state = {
      paragraphs: [],
      videos: [],
      currPara: "",
      id: "",
      url: "",
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/fluency/materials");
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
    await axios.put("/api/fluency/materials/" + this.state.id, { paragraphs });
    this.setState({ currPara: "" });
    this.componentDidMount();
  };

  handleParagraphDelete = async (index) => {
    const { paragraphs } = this.state;
    const newParagraphs = paragraphs
      .slice(0, index)
      .concat(paragraphs.slice(index + 1, paragraphs.length));
    await axios.put("/api/fluency/materials/" + this.state.id, {
      paragraphs: newParagraphs,
    });
    this.componentDidMount();
  };

  handleVideoAdd = async (file) => {
    if (!!file) {
      const doc = await axios.get("/api/fluency/video");
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
      await axios.put("/api/fluency/materials/" + id, { videos });
      this.componentDidMount();
    }
  };

  handleVideoAddByUrl = async () => {
    const { url, id, videos } = this.state;
    videos.push(url);
    await axios.put("/api/fluency/materials/" + id, { videos });
    this.setState({ url: "" });
    this.componentDidMount();
  };

  handleVideoDelete = async (index) => {
    const { videos } = this.state;
    const newVideos = videos
      .slice(0, index)
      .concat(videos.slice(index + 1, videos.length));
    await axios.put("/api/fluency/materials/" + this.state.id, {
      videos: newVideos,
    });
    this.componentDidMount();
  };

  render() {
    const { paragraphs, videos } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Modify Learning Materials</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/fluency">
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
                  style={{ marginRight: 10 }}
                  onClick={() => this.handleParagraphDelete(index)}
                >
                  Delete
                </Button>
              </div>
            );
          })}
          <hr />

          <div>
            <h4>You can either upload a video or input video URL:</h4>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => this.handleVideoAdd(e.target.files[0])}
            />
            <h6>
              (If you use the locally upload, the video will automatically
              upload when you choose the file, you do not need to click "upload"
              button again)
            </h6>
            <div className="row">
              <TextField
                value={this.state.url}
                onChange={(e) => this.setState({ url: e.target.value })}
                style={{ width: "50%", marginLeft: 10 }}
                multiline={true}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: 10 }}
                onClick={this.handleVideoAddByUrl}
              >
                Upload
              </Button>
            </div>
          </div>

          <br />
          <br />
          {videos.map((video, index) => {
            return (
              <div className="row">
                {video.includes("http") ? (
                  <h5>{video}</h5>
                ) : (
                  <h5>{keys.AWS + video}</h5>
                )}

                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ marginLeft: 10 }}
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

export default FluencyTutorMaterials;
