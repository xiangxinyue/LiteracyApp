import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 380,
    margin: 10,
  },
  media: {
    height: 170,
  },
});

export default function TrainCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea href={props.page} style={{ textDecoration: "none" }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className="text-primary"
          >
            {props.title}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="h3">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
