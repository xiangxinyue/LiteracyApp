import React from "react";
import { connect } from "react-redux";

const P = (props) => {
  const font = props.currentFont;
  const renderFont = () => {
    switch (font) {
      case 1:
        return <h2>{props.children}</h2>;
      case 2:
        return <h3>{props.children}</h3>;
      case 3:
        return <h4>{props.children}</h4>;
      case 4:
        return <h5>{props.children}</h5>;
      case 5:
        return <h6>{props.children}</h6>;
      case 6:
        return <h6>{props.children}</h6>;
      default:
        return <h4>{props.children}</h4>;
    }
  };

  return renderFont();
};

const mapStateToProps = (state) => ({
  currentFont: state.font.currentFont,
});

export default connect(mapStateToProps)(P);
