import React from "react";
import FluencyIntro from "../../components/fluency/trainintro";
import FluencyMain from "../../components/fluency/trainpart";
import FluencyHeader from "../../components/fluency/header";
import Paper from "../../assets/paper";

class FluencyPractise extends React.Component {
  state = {
    understand: false,
  };

  render() {
    const { understand } = this.state;
    return (
      <div>
        <FluencyHeader />
        {understand ? (
          <Paper component={FluencyMain} />
        ) : (
          <FluencyIntro
            handleClick={() => this.setState({ understand: !understand })}
          />
        )}
      </div>
    );
  }
}
export default FluencyPractise;
