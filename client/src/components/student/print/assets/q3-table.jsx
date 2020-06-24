import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

export default (props) => {
  return (
    <div>
      {props.rows.map((row) => (
        <div>
          <h3 className="font-weight-light">{row.question}</h3>
          {row.choices.map((choice, index) => (
            <RadioGroup
              onChange={(e) => props.handleQ3Change(e.target.value, index)}
            >
              <div className="row">
                <FormControlLabel
                  value={choice.choice1}
                  control={<Radio />}
                  label={choice.choice1}
                />
                <FormControlLabel
                  value={choice.choice2}
                  control={<Radio />}
                  label={choice.choice2}
                />
              </div>
            </RadioGroup>
          ))}
        </div>
      ))}
    </div>
  );
};
