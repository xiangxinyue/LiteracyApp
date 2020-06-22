import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

export default (props) => {
  return (
    <RadioGroup onChange={(e) => props.handleChange(e.target.value)}>
      <div className="row">
        <FormControlLabel
          value={props.value1}
          control={<Radio />}
          label={props.value1}
        />
        <FormControlLabel
          value={props.value2}
          control={<Radio />}
          label={props.value2}
        />
      </div>
    </RadioGroup>
  );
};
