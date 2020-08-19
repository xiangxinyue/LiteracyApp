import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { setCurrentFont } from "../../redux/font/fontactions";

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

export const Header = ({ currentUser, setCurrentFont }) => {
  const classes = useStyles();
  let fontSize = 4;

  const handleDecrease = () => {
    if (fontSize < 6) {
      fontSize++;
      setCurrentFont(fontSize);
    }
  };

  const handleIncrease = () => {
    if (fontSize > 1) {
      fontSize--;
      setCurrentFont(fontSize);
    }
  };

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
          <Typography variant="h5" className={classes.title}>
            Literacy Training
          </Typography>
          <div style={{ marginRight: 10 }} className="row">
            <Typography variant="h6">FontSize</Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleIncrease}
            >
              <AddIcon />
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleDecrease}
            >
              <RemoveIcon />
            </Button>
          </div>
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

const mapDispatchToProps = (dispatch) => ({
  setCurrentFont: (font) => dispatch(setCurrentFont(font)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
