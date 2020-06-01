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
            <TableCell align="right">Paragraph</TableCell>
            <TableCell align="right">Question</TableCell>
            <TableCell align="right">Choice1</TableCell>
            <TableCell align="right">Choice2</TableCell>
            <TableCell align="right">Choice3</TableCell>
            <TableCell align="right">Choice4</TableCell>
            <TableCell align="right">True Answer</TableCell>
            <TableCell align="right">Student's Answer</TableCell>
            <TableCell align="right">Reading Speed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="right">{row.paragraph}</TableCell>
              <TableCell align="right">{row.question}</TableCell>
              <TableCell align="right">{row.choices[0]}</TableCell>
              <TableCell align="right">{row.choices[1]}</TableCell>
              <TableCell align="right">{row.choices[2]}</TableCell>
              <TableCell align="right">{row.choices[3]}</TableCell>
              <TableCell align="right">{row.answer}</TableCell>
              <TableCell align="right">{row.studentAnswer}</TableCell>
              <TableCell align="right">{row.speed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
