import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Level</TableCell>
            <TableCell align="left">Question</TableCell>
            <TableCell align="left">Choices</TableCell>
            <TableCell align="left">Answer</TableCell>
            <TableCell align="left">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">{row.level}</TableCell>
              <TableCell align="left">{row.question}</TableCell>
              <TableCell align="left">
                {row.choices.map((dataset) => (
                  <div>
                    {dataset.choice1 + " / " + dataset.choice2}
                    <br />
                  </div>
                ))}
              </TableCell>
              <TableCell align="left">
                {row.choices.map((dataset) => (
                  <div>
                    {dataset.answer}
                    <br />
                  </div>
                ))}
              </TableCell>
              <TableCell align="left">
                <Button
                  color="secondary"
                  variant="outlined"
                  key={row._id}
                  onClick={() => props.handleDelete(row._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
