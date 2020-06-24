import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

export default (props) => {
  return (
    <div>
      {props.rows.map((row) => (
        <div>
          <h3 className="font-weight-light">{row.question}</h3>
          <RadioGroup onChange={(e) => props.handleQ2Change(e.target.value)}>
            <div className="row">
              {row.choices.map((choice) => (
                <FormControlLabel
                  value={choice}
                  control={<Radio />}
                  label={choice}
                />
              ))}
            </div>
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};
