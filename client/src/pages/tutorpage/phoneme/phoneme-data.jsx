import React from "react";
import axios from "axios";
import { TextField, Button, Container } from "@material-ui/core";
import Table from "../../../components/tutor/phoneme/phonemetable";

class PhonemeTutorPhonemeData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phonemeData: [],
      word: "",
      phoneme: "",
      level: "",
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/phoneme/phoneme/table");
    this.setState({ phonemeData: doc.data });
  };

  addNewData = async () => {
    const { word, phoneme, level } = this.state;
    await axios.post("/api/phoneme/phoneme", { word, phoneme, level });
    await this.setState({ word: "", phoneme: "", level: "" });
    this.componentDidMount();
  };

  deleteData = async (id) => {
    await axios.delete("/api/phoneme/phoneme/" + id);
    this.componentDidMount();
  };

  render() {
    const { word, phoneme, level, phonemeData } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify the Phoneme Data</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/phoneme">
            Go back
          </Button>
        </div>
        <Container>
          <TextField
            id="standard-basic"
            label="Word"
            value={word}
            autoComplete="off"
            onChange={(e) => this.setState({ word: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Phoneme"
            value={phoneme}
            autoComplete="off"
            onChange={(e) => this.setState({ phoneme: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Level"
            value={level}
            autoComplete="off"
            onChange={(e) => this.setState({ level: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={this.addNewData}>
            Add
          </Button>
          <br />
          <br />
          <Table
            rows={phonemeData}
            handleDelete={this.deleteData}
            name="testData"
            one="word"
            two="phoneme"
            three="level"
          />
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorPhonemeData;
