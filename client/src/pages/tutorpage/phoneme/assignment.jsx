import React from "react";
import { Container, Button } from "@material-ui/core";
import PhonemePart from "../../../components/tutor/phoneme/phonemeassign";
import AudioPart from "../../../components/tutor/phoneme/audioassign";
import axios from "axios";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

class PhonemeTutorAssign extends React.Component {
  constructor() {
    super();
    this.state = {
      phonemeAssign: [],
      audioAssign: [],
      selectedDate: null,
    };
  }

  submitAssignment = async () => {
    const { phonemeAssign, audioAssign, selectedDate } = this.state;
    await axios.post("/api/phoneme/evalassign/add", {
      phonemeAssign,
      audioAssign,
      schedule: selectedDate,
    });
    window.location = "/tutor/phoneme";
  };

  render() {
    const { selectedDate } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Sound Weekly Assignment Creation Page</h2>
          <hr />
          <Button color="default" variant="contained" href="/tutor/phoneme">
            Go Back
          </Button>
        </div>
        <Container>
          <h3>Part 1: Phoneme Part</h3>
          <PhonemePart
            handlePhonemeAssign={(data) =>
              this.setState({ phonemeAssign: data })
            }
          />
          <hr />
          <h3>Part 2: Audio Recording</h3>
          <AudioPart
            handleAudioAssign={(data) => this.setState({ audioAssign: data })}
          />
        </Container>
        <hr />
        <Container className="row">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={(date) =>
                this.setState({ selectedDate: date }, console.log(date))
              }
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <Button
            color="primary"
            variant="contained"
            onClick={this.submitAssignment}
          >
            Submit the whole assignment
          </Button>
        </Container>
      </div>
    );
  }
}

export default PhonemeTutorAssign;
