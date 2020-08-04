import React, { Component } from "react";
import { Container, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import $ from "jquery";
let time;

class FluencyFontSize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paragraph: null,
      fontSize: 4,
      playDone: false,
    };
  }

  componentDidMount = async () => {
    let index = 0;
    const paragraph =
      "The rain and wind abruptly stopped, but the sky still had the gray swirls of storms in the distance. Dave knew this feeling all too well. The calm before the storm. He only had a limited amount of time before all Hell broke loose, but he stopped to admire the calmness. Maybe it would be different this time, he thought, with the knowledge deep within that it wouldn't.";
    await this.setState({ paragraph: paragraph.split(""), playDone: false });
    const length = paragraph.length;
    let currSpeed = 30;
    setTimeout(() => {
      time = setInterval(async () => {
        if (index < length) {
          await $(`.${index}`).css("color", "white"); // "#e9ecef"
          index += 1;
        } else {
          await clearInterval(time);
          this.setState({ paragraph: null, playDone: true });
        }
      }, currSpeed);
    }, 1000);
  };

  renderLetters = (letter) => {
    const { fontSize } = this.state;
    switch (fontSize) {
      case 1:
        return <h1>{letter}</h1>;
      case 2:
        return <h2>{letter}</h2>;
      case 3:
        return <h3>{letter}</h3>;
      case 4:
        return <h4>{letter}</h4>;
      case 5:
        return <h5>{letter}</h5>;
      case 6:
        return <h6>{letter}</h6>;
    }
  };

  handleIncrease = async () => {
    const { fontSize } = this.state;
    if (fontSize === 6) return null;
    await this.setState({ fontSize: fontSize + 1 });
    this.props.newFont(this.state.fontSize);
  };

  handleDecrease = async () => {
    const { fontSize } = this.state;
    if (fontSize === 1) return null;
    await this.setState({ fontSize: fontSize - 1 });
    this.props.newFont(this.state.fontSize);
  };

  render() {
    const { paragraph, fontSize, playDone } = this.state;
    return (
      <Container>
        <div className="row" style={{ paddingLeft: 30, fontSize: 20 }}>
          {paragraph
            ? paragraph.map((letter, index) => {
                if (letter === " ") {
                  return (
                    <div className={index} key={index}>
                      &nbsp;
                    </div>
                  );
                } else {
                  return (
                    <div className={index} key={index}>
                      {this.renderLetters(letter)}
                    </div>
                  );
                }
              })
            : null}
        </div>
        <div className="row">
          {playDone ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => this.props.start()}
              >
                Start
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={this.componentDidMount}
              >
                Read Again
              </Button>
            </div>
          ) : null}

          <div style={{ marginLeft: 10 }} className="row">
            <Button
              variant="outlined"
              color="default"
              size="small"
              onClick={this.handleDecrease}
            >
              <AddIcon />
            </Button>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            {this.renderLetters(fontSize)}
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <Button
              variant="outlined"
              color="default"
              size="small"
              onClick={this.handleIncrease}
            >
              <RemoveIcon />
            </Button>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            {this.renderLetters(
              "(1 is the largest font size, 6 is the smallest one)"
            )}
          </div>
        </div>
      </Container>
    );
  }
}

export default FluencyFontSize;
