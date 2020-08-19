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
            <TableCell align="left">Real Answer</TableCell>
            <TableCell align="left">Student's Answer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">{row.level}</TableCell>
              <TableCell align="left">{row.question}</TableCell>
              <TableCell align="left">
                {row.choices.map((choice) => choice + ",")}
              </TableCell>
              <TableCell align="left">{row.answer}</TableCell>
              <TableCell align="left">{row.studentAnswer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
