import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
            <a
              role="button"
              aria-pressed="true"
              className="btn btn-info btn-lg active"
              href="/auth/student"
              style={{ marginRight: 10 }}
            >
              Student Sign In
            </a>
            <a
              role="button"
              aria-pressed="true"
              className="btn btn-info btn-lg active"
              href="/tutor/signin"
            >
              Tutor Sign In
            </a>
          </div>
        );
      default:
        return (
          <div>
            <a
              role="button"
              aria-pressed="true"
              className="btn btn-info btn-lg active"
              href="/"
              style={{ marginRight: 10 }}
            >
              Home
            </a>
            <a
              role="button"
              aria-pressed="true"
              className="btn btn-info btn-lg active"
              href="/auth/logout"
            >
              Log Out
            </a>
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
