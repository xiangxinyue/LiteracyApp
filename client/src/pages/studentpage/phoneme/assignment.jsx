import React from "react";
import PhonemeIntro from "../../../components/student/phoneme/assign/assignintro";
import PhonemePart from "../../../components/student/phoneme/assign/phonemepart";
import AudioPart from "../../../components/student/phoneme/assign/audiopart";
import PhonemeHeader from "../../../components/student/phoneme/assets/header";
import { Container } from "@material-ui/core";
import axios from "axios";

class PhonemeAssign extends React.Component {
  state = {
    start: false,
    phonemeDone: false,
    phonemeAssign: [],
  };

  handleAudioAssign = async (data) => {
    const { phonemeAssign } = this.state;
    // get assign date
    const doc = await axios("/api/phoneme/evalassign");
    const date = doc.data.createAt;
    // placehold student history score
    await axios.post("/api/phoneme/historyscore/update", { assignDate: date });
    // generate student assignment
    await axios.post("/api/phoneme/evalassign", {
      phonemeAssign,
      audioAssign: data,
      assignDate: date,
    });
    window.location = "/student/phoneme";
  };

  render() {
    const { start, phonemeDone } = this.state;
    return (
      <div>
        <PhonemeHeader part="Assignment" />
        <Container>
          {start ? (
            !phonemeDone ? (
              <PhonemePart
                handlePhonemeAssign={(data) =>
                  this.setState({ phonemeAssign: data, phonemeDone: true })
                }
              />
            ) : (
              <AudioPart
                handleAudioAssign={(data) => this.handleAudioAssign(data)}
              />
            )
          ) : (
            <PhonemeIntro
              handleClick={() => this.setState({ start: !start })}
            />
          )}
        </Container>
      </div>
    );
  }
}
export default PhonemeAssign;
