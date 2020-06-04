import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { TextField, Button, Container } from "@material-ui/core";
import Table from "./phonemetable";

class PhonemeTutorAssign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      traindata: [],
      assignAddWord: "",
      assignAddPhoneme: "",
      assignAddLevel: "",
      assigndata: [],
      assignNum: 20,
    };
  }

  componentDidMount = async () => {
    const traindata = await axios.get("/api/phoneme/train/gettable");
    await this.setState({
      traindata: traindata.data,
    });
  };

  addNewAssignEntry = () => {
    const {
      assignAddWord,
      assignAddPhoneme,
      assignAddLevel,
      assigndata,
    } = this.state;
    const newEntry = {
      word: assignAddWord,
      phoneme: assignAddPhoneme,
      level: assignAddLevel,
    };
    const newAssign = assigndata;
    newAssign.push(newEntry);
    this.setState({
      assigndata: newAssign,
      assignAddWord: "",
      assignAddPhoneme: "",
      assignAddLevel: "",
    });
  };

  generateAssign = () => {
    const { traindata, assignNum } = this.state;
    const length = traindata.length;
    const assign = [];
    for (let i = 0; i < assignNum; i++) {
      const index = Math.floor(Math.random() * length);
      console.log("choose", index);
      assign.push(traindata[index]);
    }
    this.setState({ assigndata: assign });
  };

  deleteAssignEntry = (id) => {
    const newAssign = this.state.assigndata.filter((ele) => {
      if (ele.id !== id) return ele;
    });
    this.setState({ assigndata: newAssign });
  };

  render() {
    const {
      assignAddWord,
      assignAddPhoneme,
      assignAddLevel,
      assigndata,
      assignNum,
      alert,
    } = this.state;

    return (
      <div>
        <Container>
          {assigndata.length != assignNum ? (
            <div>
              <TextField
                id="standard-basic"
                label="Number of questions"
                value={assignNum}
                onChange={(e) => this.setState({ assignNum: e.target.value })}
              />
              <TextField
                id="standard-basic"
                label="Word"
                value={assignAddWord}
                onChange={(e) =>
                  this.setState({ assignAddWord: e.target.value })
                }
              />
              <TextField
                id="standard-basic"
                label="Phoneme"
                value={assignAddPhoneme}
                onChange={(e) =>
                  this.setState({ assignAddPhoneme: e.target.value })
                }
              />
              <TextField
                id="standard-basic"
                label="Level"
                value={assignAddLevel}
                onChange={(e) =>
                  this.setState({ assignAddLevel: e.target.value })
                }
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={this.addNewAssignEntry}
              >
                Add New Entry
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.generateAssign}
              >
                Generate assignment
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.handlePhonemeAssign(assigndata)}
            >
              Submit This Part
            </Button>
          )}
          <Table
            rows={assigndata}
            handleDelete={(id) => this.deleteAssignEntry(id)}
            name="New Assignment"
            one="word"
            two="phoneme"
            three="level"
          />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PhonemeTutorAssign);
