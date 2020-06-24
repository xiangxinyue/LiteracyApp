import React from "react";
import { TextField } from "@material-ui/core";

export default (props) => {
  return (
    <div>
      {props.rows.map((row) => (
        <div>
          <h3 className="font-weight-light">{row.question}</h3>
          <div className="row">
            {[0, 1, 2, 3].map((num) => (
              <TextField
                label={"Answer " + Number(num + 1)}
                onChange={(e) => {
                  props.handleQ1Change(num, e.target.value);
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
