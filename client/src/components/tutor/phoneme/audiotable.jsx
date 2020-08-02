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
import keys from "../../../assets/keys";

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
            <TableCell align="left">Question</TableCell>
            <TableCell align="left">Audios</TableCell>
            <TableCell align="left">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">{row.question}</TableCell>
              <TableCell align="left">
                {row.audios.map((audio) => {
                  return <audio src={keys.AWS + audio} controls="controls" />;
                })}
              </TableCell>
              <TableCell align="left">
                <Button
                  color="secondary"
                  key={row.id}
                  onClick={() => props.handleDelete(row.audio)}
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
