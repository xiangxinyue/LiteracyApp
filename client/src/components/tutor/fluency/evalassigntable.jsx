import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
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
    const { answer, studentAnswer } = row;
    if (answer === studentAnswer) {
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
            <TableCell align="left">Paragraph</TableCell>
            <TableCell align="left">Question</TableCell>
            <TableCell align="left">Choice1</TableCell>
            <TableCell align="left">Choice2</TableCell>
            <TableCell align="left">Choice3</TableCell>
            <TableCell align="left">Choice4</TableCell>
            <TableCell align="left">True Answer</TableCell>
            <TableCell align="left">Student's Answer</TableCell>
            <TableCell align="left">Reading Speed</TableCell>
            <TableCell align="left">Evaluation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">{row.paragraph}</TableCell>
              <TableCell align="left">{row.question}</TableCell>
              <TableCell align="left">{row.choices[0]}</TableCell>
              <TableCell align="left">{row.choices[1]}</TableCell>
              <TableCell align="left">{row.choices[2]}</TableCell>
              <TableCell align="left">{row.choices[3]}</TableCell>
              <TableCell align="left">{row.answer}</TableCell>
              <TableCell align="left">{row.studentAnswer}</TableCell>
              <TableCell align="left">{row.speed}</TableCell>
              <TableCell align="left">{checkAnswer(row)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
