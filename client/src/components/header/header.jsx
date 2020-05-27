import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header = ({ currentUser }) => {
  const classes = useStyles();

  const getHeader = () => {
    switch (currentUser) {
      case null:
        return;
      case false:
        return (
          <div>
            <ArrowRightAltIcon style={{ fontSize: 100 }} color="secondary" />
            <Button
              variant="contained"
              color="default"
              href="/auth/google_student"
              style={{ marginRight: 10 }}
            >
              Student Signin
            </Button>
            <Button
              variant="contained"
              color="default"
              href="/auth/google_tutor"
            >
              Tutor Signin
            </Button>
          </div>
        );
      default:
        return (
          <div>
            <Button
              variant="contained"
              color=""
              href="/"
              style={{ marginRight: 10 }}
            >
              Home
            </Button>
            {/* {currentUser.role === "student" ? (
              <Button
                variant="contained"
                color=""
                href="/studentdashboard"
                style={{ marginRight: 10 }}
              >
                My Scores
              </Button>
            ) : (
              <Button
                variant="contained"
                color=""
                href="/instructordashboard"
                style={{ marginRight: 10 }}
              >
                Students' Score
              </Button>
            )} */}
            <Button variant="contained" color="" href="/auth/logout">
              Log Out
            </Button>
          </div>
        );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Literacy Training
          </Typography>

          {getHeader()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

// How to get data from Redux State?
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
