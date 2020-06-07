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
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();

  const checkAnswer = (row) => {
    const { phoneme, answer } = row;
    if (phoneme === answer) {
      return <CheckIcon fontSize="large" style={{ color: "green" }} />;
    } else {
      return <CloseIcon color="secondary" fontSize="large" />;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Level</TableCell>
            <TableCell align="left">Word</TableCell>
            <TableCell align="left">Phoneme</TableCell>
            <TableCell align="left">Answer</TableCell>
            <TableCell align="left">Evaluation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">{row.level}</TableCell>
              <TableCell align="left">{row.word}</TableCell>
              <TableCell align="left">{row.phoneme}</TableCell>
              <TableCell align="left">{row.answer}</TableCell>
              <TableCell align="left">{checkAnswer(row)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
