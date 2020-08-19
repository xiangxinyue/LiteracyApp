import React from "react";
import CallMadeIcon from "@material-ui/icons/CallMade";
import P2 from "../../assets/fonts/p2";
import MuiAlert from "@material-ui/lab/Alert";
const Alert = (props) => {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
};

export default () => {
  return (
    <P2 className="text-danger">
      You have not Signed In yet. Please Sign In by clicking the red top right
      button.
    </P2>
  );
};
